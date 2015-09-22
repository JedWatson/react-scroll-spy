const Dispatcher = {
	bound: false,
	listeners: [],
	register (fn) {
		this.listeners.push(fn);
		if (!this.bound) this.bindEvent();
	},
	unregister (fn) {
		var i = this.listeners.indexOf(fn);
		if (i < 0) return;
		this.listeners.splice(i, 1);
		if (!this.listeners.length) this.unbindEvent();
	},
	onScroll (e) {
		this.listeners.forEach(fn => fn(e));
	},
	bindEvent () {
		this.bound = true;
		window.addEventListener('scroll', this.onScroll);
	},
	unbindEvent () {
		this.bound = false;
		window.addEventListener('scroll', this.onScroll);
	}
};

Dispatcher.onScroll = Dispatcher.onScroll.bind(Dispatcher);

export default Dispatcher;
