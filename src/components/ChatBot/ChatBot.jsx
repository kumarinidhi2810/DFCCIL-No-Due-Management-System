import { useState, useRef, useEffect } from "react";
import {
  Fab,
  Paper,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import "./ChatBot.css";
const ChatBot = () => {
  const [open, setOpen] = useState(false);
const [message, setMessage] = useState("");

const [messages, setMessages] = useState([
  {
    sender: "bot",
    text: "Hello! Welcome to No Due Assistant 👋",
  },
]);
const [typing, setTyping] = useState(false);
const messagesEndRef = useRef(null);
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages]);
const sendQuickMessage = (text) => {
  setMessage(text);

  setTimeout(() => {
    handleSend(text);
  }, 100);
};
const handleSend = (quickMessage = null) => {
      console.log("quickMessage =", quickMessage);
  console.log("typeof =", typeof quickMessage);
     if (quickMessage && typeof quickMessage !== "string") {
    quickMessage = null;
  }
const userInput = quickMessage || message;
 console.log("userInput =", userInput);
  console.log("typeof userInput =", typeof userInput);
if (typeof userInput !== "string") return;
if (!userInput.trim()) return;

  const userMessage = {
    sender: "user",
    text: userInput,
  };
const requests =
  JSON.parse(localStorage.getItem("requests")) || [];

const loggedInUser =
  JSON.parse(localStorage.getItem("user"));

const request = requests.find(
  (req) =>
    req.employeeId === loggedInUser?.employeeId
);

let reply = "";

const msg = userInput.toLowerCase().trim();
if (
  msg === "hi" ||
  msg === "hello" ||
  msg === "hey"
) {
  reply = `👋 Hello ${request?.employeeName || "User"}!

Welcome to No Due Assistant.

How can I help you today?`;
}
else if (
  msg.includes("thank") ||
  msg.includes("thanks")
) {
  reply = "😊 You're welcome! Happy to help.";
}
else if (
  msg.includes("bye") ||
  msg.includes("goodbye")
) {
  reply = "👋 Have a great day!";
}

else if (msg.includes("status")) {
  reply = request
    ? `Your request status is ${request.status}.`
    : "No request found.";
}

else if (msg.includes("request id")) {
  reply = request
    ? `Your Request ID is ${request.requestId}.`
    : "No request found.";
}

else if (msg.includes("employee")) {
  reply = request
    ? `Employee Name: ${request.employeeName}`
    : "Employee not found.";
}

else if (msg.includes("certificate")) {
  if (request?.status === "FINAL_APPROVED") {
    reply = "✅ Your No Due Certificate is ready for download.";
  } else {
    reply = "❌ Certificate is not available yet.";
  }
}
else if (msg.includes("pending services")) {

  if (!request) {
    reply = "No request found.";
  } else {

    const pendingServices = request.services.filter(
      (service) => service.status !== "PROVIDER_APPROVED"
    );

    if (pendingServices.length === 0) {
      reply = "🎉 All services are approved.";
    } else {
      reply =
        "Pending Services:\n\n" +
        pendingServices
          .map((service) => `• ${service.serviceName}`)
          .join("\n");
    } }}
    else if (msg.includes("approved services")) {

  if (!request) {
    reply = "No request found.";
  } else {

    const approvedServices = request.services.filter(
      (service) => service.status === "PROVIDER_APPROVED"
    );

    if (approvedServices.length === 0) {
      reply = "No approved services found.";
    } else {
      reply =
        "Approved Services:\n\n" +
        approvedServices
          .map((service) => `✅ ${service.serviceName}`)
          .join("\n");
    }}}
    else if (msg.includes("provider")) {

  if (!request) {
    reply = "No request found.";
  } else {

    reply =
      "Service Providers:\n\n" +
      request.services
        .map(
          (service) =>
            `• ${service.serviceName} → ${service.providerName}`
        )
        .join("\n");

  }

}
else if (
  msg.includes("help") ||
  msg.includes("menu") ||
  msg.includes("options")
) {

  reply = `🤖 I can help you with:

📋 Request Status
📄 Certificate Status
⏳ Pending Services
✅ Approved Services
👨‍💼 Provider Details
🆔 Request ID

You can either type these commands or click the buttons below.`;

}


else {
  reply =
    "Sorry, I couldn't understand. Try:\nStatus\nCertificate\nRequest ID";
}
const botMessage = {
  sender: "bot",
  text: reply,
};


setMessages((prev) => [...prev, userMessage]);

// Typing start
setTyping(true);


setTimeout(() => {
  setTyping(false);

  setMessages((prev) => [
    ...prev,
    botMessage,
  ]);
}, 1000);

setMessage("");
}

  return (
    <>
      {/* Floating Button */}
      <Fab
        color="primary"
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1300,
        }}
      >
        <ChatIcon />
      </Fab>

      {/* Chat Window */}
      {open && (
        <Paper
          elevation={8}
          sx={{
            position: "fixed",
            bottom: 90,
            right: 24,
            width: 350,
            height: 500,
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 1300,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              bgcolor: "#1976d2",
              color: "white",
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography fontWeight={600}>
              🤖 IT Assistant
            </Typography>

            <IconButton
              size="small"
              sx={{ color: "white" }}
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Body */}
         {/* Messages */}
<Box
  sx={{
    flex: 1,
    p: 2,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 1,
  }}
>
  {messages.map((msg, index) => (
    <Box
      key={index}
      sx={{
        alignSelf:
          msg.sender === "user"
            ? "flex-end"
            : "flex-start",

        bgcolor:
          msg.sender === "user"
            ? "#1976d2"
            : "#f5f5f5",

        color:
          msg.sender === "user"
            ? "white"
            : "black",

        px: 2,
        py: 1,
        borderRadius: 2,
        maxWidth: "80%",
      }}
    >
      {msg.text}
    </Box>
  ))}
{typing && (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1,
      ml: 1,
    }}
  >
    <Typography>
      🤖
    </Typography>

    <Box
      sx={{
        display: "flex",
        gap: "4px",
      }}
    >
      <Box className="dot"></Box>
      <Box className="dot"></Box>
      <Box className="dot"></Box>
    </Box>
  </Box>
)}
  <div ref={messagesEndRef}></div>
</Box>
<Box
  sx={{
    p: 1,
    display: "flex",
    flexWrap: "wrap",
    gap: 1,
  }}
>
  <Button
    size="small"
    variant="outlined"
    onClick={() => sendQuickMessage("status")}
  >
    Request Status
  </Button>

  <Button
    size="small"
    variant="outlined"
    onClick={() => sendQuickMessage("certificate")}
  >
    Certificate
  </Button>

  <Button
    size="small"
    variant="outlined"
    onClick={() => sendQuickMessage("request id")}
  >
    Request ID
  </Button>
  <Button
  size="small"
  variant="outlined"
  onClick={() => sendQuickMessage("pending services")}
>
  Pending Services
</Button>
<Button
  size="small"
  variant="outlined"
  onClick={() => sendQuickMessage("approved services")}
>
  Approved Services
</Button>
<Button
  size="small"
  variant="outlined"
  onClick={() => sendQuickMessage("provider")}
>
  Provider
</Button>
<Button
  size="small"
  variant="outlined"
  onClick={() => sendQuickMessage("help")}
>
  Help
</Button>
</Box>
<Box
  sx={{
    display: "flex",
    gap: 1,
    p: 2,
    borderTop: "1px solid #ddd",
  }}
>
 <TextField
  fullWidth
  size="small"
  placeholder="Type a message..."
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  onKeyDown={(e) => {

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }

  }}
/>

  <Button
    variant="contained"
    onClick={handleSend}
  >
    Send
  </Button>
</Box>
        </Paper>
      )}
    </>
  );
};

export default ChatBot;