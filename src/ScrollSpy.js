import React from 'react';
import Dispatcher from './Dispatcher';

function elementInViewport (el) {

	var rect = el.getBoundingClientRect();

	// Hack to initiate transitions at the right time - Needs a rethink
	return (
		rect.left >= 0 &&
		rect.top < (window.innerHeight * 0.75 || document.documentElement.clientHeight * 0.75) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}

function ScrollTransitionMixin (ref, isInViewKey, wasInViewKey) {

	ref = ref || 'scrollspy';
	isInViewKey = isInViewKey || 'currentlyInView';
	wasInViewKey = wasInViewKey || 'wasInView';

	var mixin = {
		getInitialState () {
			let initialState = {};
			initialState[isInViewKey] = false;
			initialState[wasInViewKey] = false;
			return initialState;
		},
		componentDidMount () {
			Dispatcher.register(this[ref + '__handleScroll']);
		},
		componentWillUnmount () {
			Dispatcher.unregister(this[ref + '__handleScroll']);
		}
	};
	mixin[ref + '__handleScroll'] = function () {
		let newState = {};
		let node = React.findDOMNode(this.refs[ref])

		if (elementInViewport(node)) {
			if (!this.state[isInViewKey]) {
				console.log('element ' + ref + ' came into view');
				newState[isInViewKey] = true;
				newState[wasInViewKey] = true;
				this.setState(newState);
			}
		} else if (this.state[isInViewKey]) {
			console.log('element ' + ref + ' left view');
			newState[isInViewKey] = false;
			this.setState(newState);
		}
	};

	return mixin;
}

export default ScrollTransitionMixin;
