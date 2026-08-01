const authorization = (string) => {
  return (req, res, next) => {

    if (!req.token || !req.token.roleId) {
      return res.status(401).json({ 
        success: false, 
        message: 'unauthorized - no role found' 
      });
    }
  }
    const permissions = req.token.permission || [];
     

    
      if (permissions.includes(requirePermission)) {
      res.status(403);
      next();
    } else {
      res.status(401).json({ success: false, message: "unauthorized" });
    }
};



module.exports = authorization;









