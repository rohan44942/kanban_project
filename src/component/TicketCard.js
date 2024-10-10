import React from "react";
import "./TicketCard.css"; // Import the new CSS for styling

function TicketCard({ ticket, user }) {
  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        <div className="user-profile">
          <img
          src="https://picsum.photos/id/237/200/300"
          alt="Status Icon"
          className="ticket-icon"
        />
        </div>
      </div>

      <div className="ticket-details">
        <h2 className="ticket-title">{ticket.title}</h2>
      </div>

      <div className="ticket-footer">
        <div className="user-info">
          <img
            src="./icons_FEtask/3dot.svg"
            alt={user.name}
            className="user-avatar"
          />
        </div>
        <div className="ticket-tags">
          {ticket.tag.map((tag, index) => (
            <span key={index} className="ticket-tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TicketCard;
