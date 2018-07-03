export let forceGraph = {
  nodes: [
    {
      "name": "海康",
      "nodeType": 0,
      "symbolSize": 40,
      "category": 0,
      //"value": "3****************3",
      //"legendName": "用户",
      //"idCardNum": "3****************3"
    },
    {
      "name": "摄像头",
      "symbolSize": 40,
      //"value": "银行卡分类",
      "category": -14,
     // "legendName": "银行卡分类",
      "nodeType": 1
    },
    {
      "name": "工行卡:4077",
      "symbolSize": 40,
     // "value": "工行卡:4077",
      "category": -10,
     // "legendName": "银行卡",
      "nodeType": 0
    },
    {
      "name": "建行卡:4078",
      "symbolSize": 40,
     // "value": "建行卡:4078",
      "category": -10,
      //"legendName": "银行卡",
      "nodeType": 0
    },
    {
      "name": "人脸",
      "symbolSize": 40,
      //"value": "基本信息",
      "category": -11,
     //"legendName": "基本信息",
      "nodeType": 1
    },
    {
      "name": "张三",
      "symbolSize": 40,
      //"value": "张三",
      "category": -2,
      //"legendName": "姓名",
      "nodeType": 0
    },
    {
      "name": "汽车",
      "symbolSize": 40,
     // "value": "联系方式",
      "category": -13,
      //"legendName": "联系方式",
      "nodeType": 1
    },
    {
      "name": "145157****@qq.com",
      "symbolSize": 40,
     // "value": "145157****@qq.com",
      "category": -7,
     // "legendName": "邮箱",
      "nodeType": 0
    },
    {
      "name": "14515783**",
      "symbolSize": 40,
      //"value": "14515783**",
      "category": -8,
      //"legendName": "qq",
      "nodeType": 0
    }
  ],
  links: [
    {
      "source": "海康",
      "target": "摄像头"
    },
    {
      "source": "摄像头",
      "target": "工行卡:4077"
    },
    {
      "source": "摄像头",
      "target": "建行卡:4078"
    },
    {
      "source": "海康",
      "target": "人脸"
    },
    {
      "source": "人脸",
      "target": "张三"
    },
    {
      "source": "海康",
      "target": "汽车"
    },
    {
      "source": "汽车",
      "target": "145157****@qq.com"
    },
    {
      "source": "汽车",
      "target": "14515783**"
    }
  ]
};
export let schoolData = {
  nodes:  [
    {id:0,category:0,name:'xx大学',label:'xx大学',symbolSize:40,ignore:false,flag:true},
    {id:1,category:1,name:'校区1',label:'校区1',symbolSize:30,ignore:true,flag:true},
    {id:2,category:2,name:'学院1',label:'学院1',symbolSize:20,ignore:true,flag:true},
    {id:3,category:2,name:'学院2',label:'学院2',symbolSize:20,ignore:true,flag:true},
    {id:4,category:1,name:'校区2',label:'校区2',symbolSize:30,ignore:true,flag:true},
    {id:5,category:2,name:'学院1',label:'学院1',symbolSize:20,ignore:true,flag:true},
    {id:6,category:2,name:'学院2',label:'学院2',symbolSize:20,ignore:true,flag:true},
    {id:7,category:2,name:'学院3',label:'学院3',symbolSize:20,ignore:true,flag:true},
    {id:8,category:1,name:'校区3',label:'校区3',symbolSize:30,ignore:true,flag:true},
    {id:9,category:2,name:'学院1',label:'学院1',symbolSize:20,ignore:true,flag:true},
    {id:10,category:2,name:'学院2',label:'学院2',symbolSize:20,ignore:true,flag:true},
    {id:11,category:2,name:'学院3',label:'学院3',symbolSize:20,ignore:true,flag:true},
    {id:12,category:2,name:'学院4',label:'学院4',symbolSize:20,ignore:true,flag:true},
    {id:13,category:3,name:'一班',label:'一班',number:45,techear:'张三',symbolSize:20,ignore:true,flag:true},
    {id:14,category:3,name:'二班',label:'二班',number:52,techear:'李四',symbolSize:20,ignore:true,flag:true}
  ],
  links: [
    {source : 1,target : 0,value:1},
    {source : 4,target : 0,value:5},
    {source : 8,target : 0,value:15},
    {source : 2,target : 1,value:20},
    {source : 3,target : 1,value:25},
    {source : 5,target : 4,value:30},
    {source : 6,target : 4,value:35},
    {source : 7,target : 4,value:40},
    {source : 9,target : 8,value:45},
    {source : 10,target : 8,value:50},
    {source : 11,target : 8,value:55},
    {source : 12,target : 8,value:60},
    {source : 13,target : 6,value:65},
    {source : 14,target : 6,value:70} ]
};
