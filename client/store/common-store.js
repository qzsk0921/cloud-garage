const {
  Store,
  update
} = require('westore')
// import {Store, update} from "westore"
const common = require('../model/common')
const Log = require('../model/log')
const Todo = require('../model/todo')
const setting = require('../model/setting')

class CommonStore extends Store {
  constructor(options) {
    super()
    this.options = options
    this.data = {
      logsSize: [],
      todoTitle: '',
      todos: [],
      count: 18,

      settingInfo: {}, //微信设置信息 settingInfo.authSetting['scope.userInfo'](微信已授权)
      menuButtonObject: wx.getMenuButtonBoundingClientRect(), //按钮（右上角胶囊按钮）的布局位置信息
      systemInfo: null, //systemInfo system:'ios'||'android',
      navHeight: 0, //顶部导航栏高度

      left: 1,
      done: 1,
      type: 'all'
    }

    this.common = new common()
    this.log = new Log()
    this.todo = new Todo()
    this.setting = new setting({
      onSettingLoaded: () => {
        this.data.settingInfo = this.setting.settingInfo
        this.update()
      }
    })

    this.todo.subscribe(() => {
      this.data.todos = this.todo.todos
      this.computeCount()
      this.update()
    })

  }

  init() {
    this.data.todos = this.todo.todos
    this.log.loadLogs()
    this.data.logsSize = this.log.logs.length

    this.setting.loadSetting()
    this.data.systemInfo = this.common.systemInfo
    this.data.navHeight = this.common.navHeight

    this.data.type = 'all'
    this.computeCount()
    this.update()
  }

  addTodo() {
    if (this.data.todoTitle.trim() === '') {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none',
        duration: 2000
      })

      return
    }
    this.todo.addTodo(this.data.todoTitle)
    this.data.todoTitle = ''
    this.update()
  }

  toggle(id) {
    this.todo.toggle(id)
  }

  destroy(id) {
    this.todo.destroy(id)
  }

  computeCount() {
    this.data.left = 0
    this.data.done = 0
    for (let i = 0, len = this.data.todos.length; i < len; i++) {
      this.data.todos[i].done ? this.data.done++ : this.data.left++
    }
  }

  clearDone() {
    this.todo.clearDone()
  }

  filter(type) {
    this.data.type = type
    this.update()
  }
}

module.exports = new CommonStore