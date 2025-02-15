const isAdmin = (req, res, next) => {
  if (req.user && req.user.role.includes('admin')) {
    next();
  } else {
    res.status(403).json({ message: 'Require role admin' });
  }
};

const isModerator = (req, res, next) => {
  if (req.user && req.user.roles.includes('moderator')) {
    next();
  } else {
    res.status(403).json({ message: 'Require role moderator' });
  }
};

const isModeratorOrAdmin = (req, res, next) => {
  if (
    req.user &&
    (req.user.roles.includes('moderator') || req.user.roles.includes('admin'))
  ) {
    next();
  } else {
    res.status(403).json({ message: 'Require role moderator or admin' });
  }
};

const verifyRole = {
  isAdmin,
  isModerator,
  isModeratorOrAdmin,
};

export default verifyRole;
