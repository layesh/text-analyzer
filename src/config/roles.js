const allRoles = {
  user: ['getTexts', 'manageTexts', 'analyzeTexts'],
  admin: ['getUsers', 'manageUsers', 'getTexts', 'manageTexts', 'analyzeTexts'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
