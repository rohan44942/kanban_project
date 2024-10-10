import React, { useState } from "react";
import TicketCard from "./TicketCard";
import "./Board.css";

function Board({ tickets, users, groupBy, sortBy }) {
  const [showForm, setShowForm] = useState(false); // State for showing the form
  const [newTicketTitle, setNewTicketTitle] = useState(""); // Form input

  // Priority mapping for icons and labels
  const priorityMap = {
    Urgent: { icon: "./icons_FEtask/urgent.svg", label: "Urgent" },
    High: { icon: "./icons_FEtask/high.svg", label: "High" },
    Medium: { icon: "./icons_FEtask/medium.svg", label: "Medium" },
    Low: { icon: "./icons_FEtask/low.svg", label: "Low" },
    "No priority": {
      icon: "./icons_FEtask/no-priority.svg",
      label: "No Priority",
    },
  };

  // Status categories
  const statusCategories = [
    "Backlog",
    "To Do",
    "In Progress",
    "Done",
    "Canceled",
  ];

  // Toggle form visibility
  const handleAddNewTicket = () => {
    setShowForm((prev) => !prev);
  };

  // Group tickets by status, user, or priority
  const groupTickets = () => {
    const grouped = {};

    if (groupBy === "status") {
      // Initialize grouped with status categories
      statusCategories.forEach((status) => {
        grouped[status] = []; // Create an array for each status category
      });
      tickets.forEach((ticket) => {
        if (grouped[ticket.status]) {
          grouped[ticket.status].push(ticket);
        }
      });
    } else if (groupBy === "user") {
      tickets.forEach((ticket) => {
        const user =
          users.find((u) => u.id === ticket.userId)?.name || "Unknown";
        if (!grouped[user]) {
          grouped[user] = [];
        }
        grouped[user].push(ticket);
      });
    } else if (groupBy === "priority") {
      tickets.forEach((ticket) => {
        const priority = ticket.priority || "No priority";
        if (!grouped[priority]) {
          grouped[priority] = [];
        }
        grouped[priority].push(ticket);
      });
    }

    return grouped;
  };

  // Sort tickets by selected sort criteria
  const sortTickets = (group) => {
    return group.sort((a, b) => {
      if (sortBy === "priority") {
        return b.priority - a.priority; // Descending priority
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title); // Ascending title
      }
      return 0;
    });
  };

  const groupedTickets = groupTickets();

  // Function to handle submitting a new ticket
  const handleSubmitNewTicket = () => {
    if (newTicketTitle.trim() === "") return; // Prevent empty titles
    const newTicket = {
      id: Date.now(), // Generate a unique ID
      title: newTicketTitle,
      status: "To Do", // Default status when adding a new ticket
      userId: null, // Set user ID if needed
      priority: "No priority", // Default priority
    };
    // Placeholder for adding the new ticket to the main state (needs implementation)
    // addTicket(newTicket);
    setNewTicketTitle(""); // Reset input field
    setShowForm(false); // Hide form after submission
  };

  return (
    <div className="kanban-board">
      {Object.keys(groupedTickets).map((group, index) => (
        <div key={index} className="kanban-column">
          {groupBy === "status" ? (
            <div className="status-column-header">
              <h3 className="status-title">{group}</h3>
              <span className="ticket-count">
                ({groupedTickets[group].length})
              </span>
              <button
                className="add-ticket-button"
                onClick={handleAddNewTicket}
              >
                <img src="./icons_FEtask/add.svg" alt="Add Ticket" />
              </button>
              <img
                src="./icons_FEtask/3dot.svg"
                alt="Options"
                className="three-dot-icon"
              />
            </div>
          ) : groupBy === "user" ? (
            <div className="user-column-header">
              <img
                src={`./icons_FEtask/to-do.svg`}
                alt={group}
                className="user-avatar"
              />
              <h3 className="user-name">{group}</h3>
              <span className="ticket-count">
                ({groupedTickets[group].length})
              </span>
              <button
                className="add-ticket-button"
                onClick={handleAddNewTicket}
              >
                <img src="./icons_FEtask/add.svg" alt="Add Ticket" />
              </button>
              <img
                src="./icons_FEtask/3dot.svg"
                alt="Options"
                className="three-dot-icon"
              />
            </div>
          ) : groupBy === "priority" ? (
            <div className="priority-column-header">
              <img
                src={
                  priorityMap[group]?.icon || priorityMap["No priority"].icon
                }
                alt={priorityMap[group]?.label || "No Priority"}
                className="priority-icon"
              />
              <h3 className="priority-label">
                {priorityMap[group]?.label || "No Priority"}
              </h3>
              <span className="ticket-count">
                ({groupedTickets[group].length})
              </span>
              <button
                className="add-ticket-button"
                onClick={handleAddNewTicket}
              >
                <img src="./icons_FEtask/add.svg" alt="Add Ticket" />
              </button>
              <img
                src="./icons_FEtask/3dot.svg"
                alt="Options"
                className="three-dot-icon"
              />
            </div>
          ) : (
            <h3 className="column-title">{group}</h3> // Default for other groupBy values (like priority)
          )}

          <div className="kanban-cards">
            {sortTickets(groupedTickets[group]).map((ticket) => {
              const user = users.find((u) => u.id === ticket.userId);
              return <TicketCard key={ticket.id} ticket={ticket} user={user} />;
            })}
          </div>

          {/* Form for adding new ticket */}
          {showForm && (
            <div className="new-ticket-form">
              <input
                type="text"
                placeholder="Enter ticket title"
                value={newTicketTitle}
                onChange={(e) => setNewTicketTitle(e.target.value)}
              />
              <button onClick={handleSubmitNewTicket}>Submit</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Board;
