// import React from "react";
// import { Modal, Button, Box, Typography, Divider } from "@mui/material";
// import { motion } from "framer-motion";

// interface NotificationModalProps {
//   type: "email" | "wati";
//   open: boolean;
//   onClose: () => void;
//   onReply: () => void;
// }

// const NotificationModal: React.FC<NotificationModalProps> = ({
//   type,
//   open,
//   onClose,
//   onReply,
// }) => {
//   const styles: Record<string, { accentColor: string }> = {
//     email: { accentColor: "#1976d2" },
//     wati: { accentColor: "#2e7d32" },
//   };

//   const { accentColor } = styles[type];

//   return (
//     <Modal
//       open={open}
//       onClose={onClose}
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Box
//         component={motion.div}
//         initial={{ opacity: 0, y: -40 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -40 }}
//         transition={{ duration: 0.3 }}
//         sx={{
//           width: 420,
//           bgcolor: "white",
//           boxShadow: 6,
//           borderRadius: 3,
//           overflow: "hidden",
//         }}
//       >
//         {/* Header Bar */}
//         <Box
//           sx={{
//             bgcolor: accentColor,
//             color: "white",
//             textAlign: "center",
//             py: 1.5,
//           }}
//         >
//           <Typography variant="h6">
//             New {type === "email" ? "Email" : "WATI"} Message
//           </Typography>
//         </Box>

//         {/* Content */}
//         <Box sx={{ p: 3, textAlign: "center" }}>
//           <Typography variant="body1" sx={{ mb: 2, color: "#333" }}>
//             You have a new message. Would you like to reply now?
//           </Typography>
//           <Divider sx={{ mb: 3 }} />
//           <Box display="flex" justifyContent="center" gap={2}>
//             <Button
//               variant="contained"
//               sx={{
//                 bgcolor: accentColor,
//                 textTransform: "none",
//                 px: 3,
//                 "&:hover": { bgcolor: accentColor },
//               }}
//               onClick={onReply}
//             >
//               Reply
//             </Button>
//             <Button
//               variant="outlined"
//               sx={{
//                 borderColor: accentColor,
//                 color: accentColor,
//                 textTransform: "none",
//                 px: 3,
//                 "&:hover": { borderColor: accentColor },
//               }}
//               onClick={onClose}
//             >
//               Reply Later
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default NotificationModal;


// import React from "react";
// import { Modal, Button, Box, Typography, Divider, IconButton } from "@mui/material";
// import { motion } from "framer-motion";
// import CloseIcon from "@mui/icons-material/Close";

// interface NotificationModalProps {
//   type: "email" | "wati";
//   open: boolean;
//   onClose: () => void;
//   onReply: () => void;
// }

// const NotificationModal: React.FC<NotificationModalProps> = ({
//   type,
//   open,
//   onClose,
//   onReply,
// }) => {
//   const styles: Record<string, { accentColor: string }> = {
//     email: { accentColor: "#1976d2" },
//     wati: { accentColor: "#2e7d32" },
//   };

//   const { accentColor } = styles[type];

//   return (
//     <Modal
//       open={open}
//       onClose={onClose}
//       sx={{
//         display: "flex",
//         alignItems: "flex-end",
//         justifyContent: "flex-end",
//         p: 2,
//       }}
//     >
//       <Box
//         component={motion.div}
//         initial={{ opacity: 0, x: 40, y: 40 }}
//         animate={{ opacity: 1, x: 0, y: 0 }}
//         exit={{ opacity: 0, x: 40, y: 40 }}
//         transition={{ duration: 0.3 }}
//         sx={{
//           width: 380,
//           bgcolor: "white",
//           boxShadow: 6,
//           borderRadius: 3,
//           overflow: "hidden",
//           position: "relative",
//         }}
//       >
//         {/* Close Button */}
//         {/* <IconButton
//           onClick={onClose}
//           sx={{
//             position: "absolute",
//             top: 8,
//             right: 8,
//             color: "white",
//             zIndex: 10,
//           }}
//         >
//           <CloseIcon />
//         </IconButton> */}

//         {/* Header Bar */}
//         <Box
//           sx={{
//             bgcolor: accentColor,
//             color: "white",
//             textAlign: "center",
//             py: 1.5,
//           }}
//         >
//           <Typography variant="h6">
//             New {type === "email" ? "Email" : "WATI"} Message
//           </Typography>
//         </Box>

//         {/* Content */}
//         <Box sx={{ p: 3, textAlign: "center" }}>
//           <Typography variant="body1" sx={{ mb: 2, color: "#333" }}>
//             You have a new message. Would you like to reply now?
//           </Typography>
//           <Divider sx={{ mb: 3 }} />
//           <Box display="flex" justifyContent="center" gap={2}>
//             <Button
//               variant="contained"
//               sx={{
//                 bgcolor: accentColor,
//                 textTransform: "none",
//                 px: 3,
//                 "&:hover": { bgcolor: accentColor },
//               }}
//               onClick={onReply}
//             >
//               Reply
//             </Button>
//             <Button
//               variant="outlined"
//               sx={{
//                 borderColor: accentColor,
//                 color: accentColor,
//                 textTransform: "none",
//                 px: 3,
//                 "&:hover": { borderColor: accentColor },
//               }}
//               onClick={onClose}
//             >
//               Reply Later
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default NotificationModal;



import React from "react";
import { Button, Box, Typography, Divider, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";

interface NotificationModalProps {
  type: "email" | "wati";
  open: boolean;
  onClose: () => void;
  onReply: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  type,
  open,
  onClose,
  onReply,
}) => {
  const styles: Record<string, { accentColor: string }> = {
    email: { accentColor: "#1976d2" },
    wati: { accentColor: "#2e7d32" },
  };

  const { accentColor } = styles[type];

  if (!open) return null; // don't render if closed

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, x: 40, y: 40 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: 40, y: 40 }}
      transition={{ duration: 0.3 }}
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 380,
        bgcolor: "white",
        boxShadow: 6,
        borderRadius: 3,
        overflow: "hidden",
        zIndex: 1400, // keep above content
        pointerEvents: "auto", // allow interaction inside
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "white",
          zIndex: 10,
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Header Bar */}
      <Box
        sx={{
          bgcolor: accentColor,
          color: "white",
          textAlign: "center",
          py: 1.5,
        }}
      >
        <Typography variant="h6">
          New {type === "email" ? "Email" : "WATI"} Message
        </Typography>
      </Box>

      {/* Content */}
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="body1" sx={{ mb: 2, color: "#333" }}>
          You have a new message. Would you like to reply now?
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box display="flex" justifyContent="center" gap={2}>
          <Button
            variant="contained"
            sx={{
              bgcolor: accentColor,
              textTransform: "none",
              px: 3,
              "&:hover": { bgcolor: accentColor },
            }}
            onClick={onReply}
          >
            Reply
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: accentColor,
              color: accentColor,
              textTransform: "none",
              px: 3,
              "&:hover": { borderColor: accentColor },
            }}
            onClick={onClose}
          >
            Reply Later
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NotificationModal;
