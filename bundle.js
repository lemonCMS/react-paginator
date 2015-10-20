'use strict';

var React = require('react');
var _ = require('lodash');
var classNames = require('classnames');

var Paginator = React.createClass({displayName: "Paginator",
    propTypes: {
        currPage: React.PropTypes.number.isRequired,
        lastPage: React.PropTypes.number.isRequired,
        onChange: React.PropTypes.func.isRequired
    },
    prevPageClicked: function() {
        if (this.props.currPage > 1) {
            this.props.onChange(Number(this.props.currPage) - 1);
        }
    },
    nextPageClicked: function() {
        if (this.props.currPage < this.props.lastPage) {
            this.props.onChange(Number(this.props.currPage) + 1);
        }
    },
    pageClicked: function(pageNum) {
        if (this.props.currPage != pageNum) {
            this.props.onChange(Number(pageNum));
        }
    },
    renderPrevious: function() {
        var classStr = classNames({ disabled: this.props.currPage <= 1 });
        return (
            React.createElement("li", {key: "prev", className: classStr}, 
                React.createElement("a", {rel: "prev", onClick: this.prevPageClicked}, "«")
            )
        );
    },
    renderNext: function() {
        var classStr = classNames({ disabled: this.props.currPage >= this.props.lastPage });
        return (
            React.createElement("li", {key: "next", className: classStr}, 
                React.createElement("a", {rel: "next", onClick: this.nextPageClicked}, "»")
            )
        );
    },
    renderDots: function(key) {
        return React.createElement("li", {key: key, className: "disabled"}, React.createElement("span", null, "..."));
    },
    renderNumber: function(num) {
        var classStr = classNames({ active: this.props.currPage == num });
        return (
            React.createElement("li", {key: num, className: classStr}, 
                React.createElement("a", {onClick: _.partial(this.pageClicked, num)}, num)
            )
        );
    },
    renderRange: function(firstNum, lastNum) {
        var pages = [];
        for (var i = firstNum; i <= lastNum; i++) {
            pages.push(this.renderNumber(i));
        }
        return pages;
    },
    renderStart: function() {
        var pages = this.renderRange(1, 2);
        pages.push(this.renderDots('dots-start'));

        return pages;
    },
    renderFinish: function() {
        var pages = this.renderRange(this.props.lastPage-1, this.props.lastPage);
        pages.unshift(this.renderDots('dots-finish'));

        return pages;
    },
    renderAdjacentRange: function() {
        return this.renderRange(this.props.currPage-2, this.props.currPage+2);
    },
    renderSlider: function() {
        var sliderNum = 6;
        var buttons = [];

        if (this.props.currPage <= sliderNum) {
            buttons = buttons.concat(this.renderRange(1, sliderNum+2));
            buttons = buttons.concat(this.renderFinish());
        }

        else if (this.props.currPage >= this.props.lastPage - sliderNum) {
            buttons = buttons.concat(this.renderStart());
            buttons = buttons.concat(this.renderRange(this.props.lastPage-sliderNum, this.props.lastPage));
        }

        else {
            buttons = buttons.concat(this.renderStart());
            buttons = buttons.concat(this.renderAdjacentRange());
            buttons = buttons.concat(this.renderFinish());
        }

        return buttons;
    },
    render: function() {
        var buttons = [];

        buttons.push(this.renderPrevious());

        if (this.props.lastPage <= 13) {
            buttons = buttons.concat(this.renderRange(1, this.props.lastPage));
        }
        else {
            buttons = buttons.concat(this.renderSlider());
        }

        buttons.push(this.renderNext());

        return (
            React.createElement("div", {className: "text-center"}, 
                React.createElement("ul", {className: "pagination"}, buttons)
            )
        );
    }
});

module.exports = Paginator;
