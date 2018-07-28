/**
 * Created by Administrator on 2018/7/22.
 */
import Mock from 'mockjs';
let taskList = []
for (let i = 0; i < 100; i++) {
  taskList.push(Mock.mock({
    task_id:Mock.Random.id(),
    taskTitle: Mock.Random.ctitle(),
    taskTypes: Mock.Random.integer(0,2),
    task_description:Mock.Random.cparagraph(),
    createTime: Mock.Random.date(),
    startTime: Mock.Random.date(),
    endTime: Mock.Random.date(),
    activePersonNum:Mock.Random.integer(0,1000),
    activePersonType:Mock.Random.integer(0,1),
    task_region_id: Mock.Random.integer(0, 50),
    effectiveTimes: Mock.Random.integer(0,10),
    imgage: Mock.Random.image('200x100', '#50B347', '#FFF', 'Mock.js'),
    taskPriceType: Mock.Random.integer(0, 1),
    taskStatus: Mock.Random.integer(0, 1),
    joinNum: Mock.Random.integer(0, 100),
    taskPriceNum: Mock.Random.integer(0,100),
    pageUrl: Mock.Random.url(),
    wxCode: Mock.Random.url(),
    minDuringTime: Mock.Random.integer(1,10),
  }));
}

export {taskList}
