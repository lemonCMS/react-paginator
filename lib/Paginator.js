'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _partial2 = require('lodash/partial');

var _partial3 = _interopRequireDefault(_partial2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Paginator = function (_React$Component) {
  _inherits(Paginator, _React$Component);

  function Paginator() {
    _classCallCheck(this, Paginator);

    var _this = _possibleConstructorReturn(this, (Paginator.__proto__ || Object.getPrototypeOf(Paginator)).call(this));

    _this.prevPageClicked = _this.prevPageClicked.bind(_this);
    _this.nextPageClicked = _this.nextPageClicked.bind(_this);
    _this.pageClicked = _this.pageClicked.bind(_this);
    _this.renderPrevious = _this.renderPrevious.bind(_this);
    _this.renderNext = _this.renderNext.bind(_this);
    _this.renderDots = _this.renderDots.bind(_this);
    _this.renderNumber = _this.renderNumber.bind(_this);
    _this.renderRange = _this.renderRange.bind(_this);
    _this.renderStart = _this.renderStart.bind(_this);
    _this.renderFinish = _this.renderFinish.bind(_this);
    _this.renderAdjacentRange = _this.renderAdjacentRange.bind(_this);
    _this.renderSlider = _this.renderSlider.bind(_this);
    _this.renderFinish = _this.renderFinish.bind(_this);
    _this.renderFinish = _this.renderFinish.bind(_this);
    _this.renderFinish = _this.renderFinish.bind(_this);
    return _this;
  }

  _createClass(Paginator, [{
    key: 'prevPageClicked',
    value: function prevPageClicked(evt) {
      evt.preventDefault();

      if (this.props.currPage > 1) {
        this.props.onChange(Number(this.props.currPage) - 1);
      }
    }
  }, {
    key: 'nextPageClicked',
    value: function nextPageClicked(evt) {
      evt.preventDefault();

      if (this.props.currPage < this.props.lastPage) {
        this.props.onChange(Number(this.props.currPage) + 1);
      }
    }
  }, {
    key: 'pageClicked',
    value: function pageClicked(pageNum, evt) {
      evt.preventDefault();

      if (this.props.currPage !== pageNum) {
        this.props.onChange(Number(pageNum));
      }
    }
  }, {
    key: 'renderPrevious',
    value: function renderPrevious() {
      var classStr = (0, _classnames2.default)({ disabled: this.props.currPage <= 1 });
      return _react2.default.createElement(
        'li',
        { key: 'prev', className: classStr },
        _react2.default.createElement(
          'a',
          { href: '#', rel: 'prev', onClick: this.prevPageClicked },
          '\xAB'
        )
      );
    }
  }, {
    key: 'renderNext',
    value: function renderNext() {
      var classStr = (0, _classnames2.default)({ disabled: this.props.currPage >= this.props.lastPage });
      return _react2.default.createElement(
        'li',
        { key: 'next', className: classStr },
        _react2.default.createElement(
          'a',
          { href: '#', rel: 'next', onClick: this.nextPageClicked },
          '\xBB'
        )
      );
    }
  }, {
    key: 'renderDots',
    value: function renderDots(key) {
      return _react2.default.createElement(
        'li',
        { key: key, className: 'disabled' },
        _react2.default.createElement(
          'span',
          null,
          '...'
        )
      );
    }
  }, {
    key: 'renderNumber',
    value: function renderNumber(num) {
      var classStr = (0, _classnames2.default)({ active: this.props.currPage === num });
      return _react2.default.createElement(
        'li',
        { key: num, className: classStr },
        _react2.default.createElement(
          'a',
          { href: '#', onClick: (0, _partial3.default)(this.pageClicked, num) },
          num
        )
      );
    }
  }, {
    key: 'renderRange',
    value: function renderRange(firstNum, lastNum) {
      var pages = [];
      for (var i = firstNum; i <= lastNum; i++) {
        pages.push(this.renderNumber(i));
      }
      return pages;
    }
  }, {
    key: 'renderStart',
    value: function renderStart() {
      var pages = this.renderRange(1, 2);
      pages.push(this.renderDots('dots-start'));

      return pages;
    }
  }, {
    key: 'renderFinish',
    value: function renderFinish() {
      var pages = this.renderRange(this.props.lastPage - 1, this.props.lastPage);
      pages.unshift(this.renderDots('dots-finish'));

      return pages;
    }
  }, {
    key: 'renderAdjacentRange',
    value: function renderAdjacentRange() {
      return this.renderRange(this.props.currPage - 2, this.props.currPage + 2);
    }
  }, {
    key: 'renderSlider',
    value: function renderSlider() {
      var sliderNum = 6;
      var buttons = [];

      if (this.props.currPage <= sliderNum) {
        buttons = buttons.concat(this.renderRange(1, sliderNum + 2));
        buttons = buttons.concat(this.renderFinish());
      } else if (this.props.currPage >= this.props.lastPage - sliderNum) {
        buttons = buttons.concat(this.renderStart());
        buttons = buttons.concat(this.renderRange(this.props.lastPage - sliderNum, this.props.lastPage));
      } else {
        buttons = buttons.concat(this.renderStart());
        buttons = buttons.concat(this.renderAdjacentRange());
        buttons = buttons.concat(this.renderFinish());
      }

      return buttons;
    }
  }, {
    key: 'render',
    value: function render() {
      var buttons = [];

      buttons.push(this.renderPrevious());

      if (this.props.lastPage <= 13) {
        buttons = buttons.concat(this.renderRange(1, this.props.lastPage));
      } else {
        buttons = buttons.concat(this.renderSlider());
      }

      buttons.push(this.renderNext());

      return _react2.default.createElement(
        'div',
        { className: 'text-center' },
        _react2.default.createElement(
          'ul',
          { className: 'pagination' },
          buttons
        )
      );
    }
  }]);

  return Paginator;
}(_react2.default.Component);

Paginator.propTypes = {
  currPage: _propTypes2.default.number.isRequired,
  lastPage: _propTypes2.default.number.isRequired,
  onChange: _propTypes2.default.func.isRequired
};

exports.default = Paginator;
//# sourceMappingURL=Paginator.js.map