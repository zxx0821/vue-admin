import Mock from 'mockjs';

const LoginUsers = [{
  id:1,
  roles: ['admin'],
  username: 'admin',
  password: '123456',
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  name: 'Andy',
  token: Mock.mock('@guid')
}];
const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.id(),
    username: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1),
    createDate:Mock.Random.date(),
    departe: Mock.mock('@csentence(3, 5)'),
    office: Mock.mock('@csentence(3, 5)'),
    isAdmin: Mock.Random.integer(0, 1)
  }));
}

export { LoginUsers, Users };

