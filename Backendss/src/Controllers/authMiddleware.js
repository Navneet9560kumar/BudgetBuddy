export const authMiddleware = (req, res, next) => {
      const userId = req.auth.userId; // Clerk se mila userId
    
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    
      // Additional checks agar chahiye to yahan daal sakte ho
      // Example: user ka ID database mein hona chahiye
      // const user = await User.findById(userId);
      // if (!user) {
      //   return res.status(404).json({ error: 'User not found' });
      // }
    
      next(); // Agar sab kuch sahi ho, to next middleware ya route function ko call karo
    };
    