import Mock from 'mockjs';
let staffInfo = []
for (let i = 0; i < 5; i++) {
  staffInfo.push(Mock.mock({
    id: Mock.Random.id(),
    workerName: Mock.Random.cname(),
    project: Mock.Random.ctitle(),
    workerType:Mock.Random.integer(0, 3),
    salaryType:Mock.Random.integer(0, 2),
    workAddress: Mock.mock('@city(true)'),
    time:Mock.Random.date()
  }));
}

export {staffInfo}
