'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DeleteAccountBtn from './delete-account-btn';
import DeleteAccountConfirmation from './delete-account-confirmation';

interface ClientWrapperProps {
  userId: string;
}

const ClientWrapper = ({ userId }: ClientWrapperProps) => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2
          }
        }
      }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }}>
        <DeleteAccountConfirmation onConfirmationChange={setIsConfirmed} />
      </motion.div>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }}>
        <DeleteAccountBtn disabled={!isConfirmed} userId={userId} />
      </motion.div>
    </motion.div>
  );
};

export default ClientWrapper;
