'use client';

import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

const AuthCostsInfo = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="group flex items-center gap-2 w-full justify-center text-muted-foreground text-sm transition-colors">
          <Info className="w-4 h-4" />
          <span className="group-hover:underline text-[10px] lg:text-base">
            Why is there no option for traditional email and password login?
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800/95 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-gray-700 sm:max-w-[425px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}>
          <DialogHeader>
            <DialogTitle className="text-color-light text-xl font-semibold mb-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2">
                <Info className="w-5 h-5 text-white" />
                Authentication Method
              </motion.div>
            </DialogTitle>
            <DialogDescription className="text-base leading-relaxed space-y-4">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}>
                This application only supports OAuth providers like Google and GitHub for
                authentication. Implementing traditional email and password login to meet the
                highest security standards would require additional mailing features, such as email
                account verification and email recovery mechanisms, all of which are
                resource-intensive and costly.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}>
                As a non-commercial hobby project, using OAuth providers helps keep the system
                simple, secure, and cost-effective while providing a better user experience.
              </motion.p>
            </DialogDescription>
          </DialogHeader>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthCostsInfo;
