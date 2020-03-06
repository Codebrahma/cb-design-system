class State {
  constructor() {
    this.observer = null;
    this.data = {};
  }

  update(data = {}) {
    this.data = data;
    this.notify(this.data);
  }

  get() {
    return this.data;
  }

  setObserver(observer) {
    this.observer = observer;
  }

  unsetObserver() {
    this.observer = null;
  }

  notify(data) {
    this.observer && this.observer(data);
  }
}

State.branches = [];

export default (branchName) => {
  const branch = State.branches[branchName];

  if (!branch || !branch.instance) {
    State.branches[branchName] = {
      instance: new State(),
    };
  }

  return State.branches[branchName].instance;
};
