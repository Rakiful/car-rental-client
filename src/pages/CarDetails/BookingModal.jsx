import React from "react";

export const BookingModal = ({ car }) => {
  return (
    <dialog id="bookingCarModal" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <div className="modal-action">
          <form method="dialog">
            <button className="btn bg-red-500 text-white btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
