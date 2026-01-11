import { useEffect, useState } from "react";
import axios from "axios";
import {
  createBooking,
  getBookedSlots
} from "../api/bookingApi";
import DashboardLayout from "../components/DashboardLayout";
import "../components/BookTest.css";

export default function BookTest() {
  const [tests, setTests] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState({});
  const [blockedSlots, setBlockedSlots] = useState({});
  const [loadingTestId, setLoadingTestId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔴 CRITICAL FIX: prevent silent crash (UNCHANGED)
  if (!user) {
    console.warn("User missing in localStorage");
    return null;
  }

  /* LOAD TESTS (UNCHANGED) */
  useEffect(() => {
    axios
      .get("https://medical-lab-booking.onrender.com/api/tests")
      .then(res => setTests(res.data))
      .catch(() => setTests([]));
  }, []);

  /* FETCH BOOKED SLOTS (UNCHANGED) */
  const loadBookedSlots = async (testId) => {
    if (blockedSlots[testId]) return;

    try {
      const res = await getBookedSlots(testId);
      setBlockedSlots(prev => ({
        ...prev,
        [testId]: res.data
      }));
    } catch {
      setBlockedSlots(prev => ({
        ...prev,
        [testId]: []
      }));
    }
  };

  /* BOOK TEST (UNCHANGED) */
  const bookTest = async (testId) => {
    const slotTime = selectedSlots[testId];
    if (!slotTime) {
      alert("Please select a time slot");
      return;
    }

    setLoadingTestId(testId);
    try {
      await createBooking({
        userId: user.id,
        testId,
        slotTime
      });

      alert("Test booked successfully ✅");

      setBlockedSlots(prev => ({
        ...prev,
        [testId]: [...(prev[testId] || []), slotTime]
      }));
    } catch {
      alert("Booking failed ❌");
    } finally {
      setLoadingTestId(null);
    }
  };

  return (
    <DashboardLayout title="Book Lab Test">

      <div className="test-list">
        {tests.map(test => (
          <div key={test.id} className="book-card">

            <div className="card-header">
              <h3>{test.testName}</h3>
              <span className="price">₹{test.price}</span>
            </div>

            <p className="desc">{test.description}</p>

            <select
              className="slot-select"
              value={selectedSlots[test.id] || ""}
              onFocus={() => loadBookedSlots(test.id)}
              onChange={e =>
                setSelectedSlots(prev => ({
                  ...prev,
                  [test.id]: e.target.value
                }))
              }
            >
              <option value="">Select Time Slot</option>

              {TIME_SLOTS.map(slot => {
                const isBlocked =
                  blockedSlots[test.id]?.includes(slot.value);

                return (
                  <option
                    key={slot.value}
                    value={slot.value}
                    disabled={isBlocked}
                  >
                    {slot.label} {isBlocked ? "(Booked)" : ""}
                  </option>
                );
              })}
            </select>

            <button
              className="book-btn"
              disabled={loadingTestId === test.id}
              onClick={() => bookTest(test.id)}
            >
              {loadingTestId === test.id ? "Booking..." : "Book Test"}
            </button>

          </div>
        ))}
      </div>

    </DashboardLayout>
  );
}

/* SLOT OPTIONS (UNCHANGED) */
const TIME_SLOTS = [
  { label: "09:00 AM", value: "09:00" },
  { label: "10:00 AM", value: "10:00" },
  { label: "11:00 AM", value: "11:00" },
  { label: "12:00 PM", value: "12:00" },
  { label: "02:00 PM", value: "14:00" },
  { label: "03:00 PM", value: "15:00" },
  { label: "04:00 PM", value: "16:00" },
];
