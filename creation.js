"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CreationMenu = function (_React$Component) {
  _inherits(CreationMenu, _React$Component);

  function CreationMenu() {
    _classCallCheck(this, CreationMenu);

    return _possibleConstructorReturn(this, (CreationMenu.__proto__ || Object.getPrototypeOf(CreationMenu)).apply(this, arguments));
  }

  _createClass(CreationMenu, [{
    key: "render",
    value: function render() {
      return React.createElement(QuestionList, null);
    }
  }]);

  return CreationMenu;
}(React.Component);

var QuestionList = function (_React$Component2) {
  _inherits(QuestionList, _React$Component2);

  function QuestionList(props) {
    _classCallCheck(this, QuestionList);

    var _this2 = _possibleConstructorReturn(this, (QuestionList.__proto__ || Object.getPrototypeOf(QuestionList)).call(this, props));

    _this2.increment = function () {
      if (_this2.state.count >= _this2.state.maxValue) return;
      _this2.setState({
        count: _this2.state.count + 1
      });
    };

    _this2.decrement = function () {
      if (_this2.state.count <= _this2.state.minValue) return;
      _this2.setState({
        count: _this2.state.count - 1
      });
    };

    _this2.handleChange = _this2.handleChange.bind(_this2);
    _this2.state = {
      value: "",
      count: 2,
      maxValue: 4,
      minValue: 2,
      numPropositions: 2
    };
    return _this2;
  }

  _createClass(QuestionList, [{
    key: "handleChange",
    value: function handleChange(selectorFiles, newValue) {
      this.setState({
        value: selectorFiles[0].name + "\t" + (selectorFiles[0].size / 1000).toFixed(2) + "KB"
      });
      setValue(newValue);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "article",
        { className: " p-5 " },
        React.createElement(
          "div",
          { className: "max-w-2xl mx-auto" },
          React.createElement(
            "div",
            { className: "flex font-display text-white" },
            React.createElement(
              "h1",
              { className: "text-2xl my-5" },
              "Question 1"
            ),
            React.createElement(
              "button",
              { className: "flex items-center focus:outline-none ml-10" },
              React.createElement(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  className: "h-5 w-5 text-red-500 ",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                },
                React.createElement("path", {
                  fillRule: "evenodd",
                  d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                  clipRule: "evenodd"
                })
              ),
              React.createElement(
                "h1",
                null,
                "Supprimer"
              )
            )
          ),
          React.createElement(
            "div",
            { className: "flex text-white", id: "localImage" },
            React.createElement(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                className: "h-10 w-10",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              },
              React.createElement("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              })
            ),
            React.createElement(
              "div",
              { className: "flex self-center" },
              React.createElement(Upload, null)
            )
          ),
          React.createElement("div", {
            className: "text-5xl my-5 text-teal-500 font-bold focus:outline-none",
            contentEditable: "true",
            "data-placeholder": "Intitul\xE9 de la question"
          }),
          React.createElement(
            "div",
            null,
            React.createElement(InputNumber, {
              count: this.state.count,
              increment: this.increment,
              decrement: this.decrement
            })
          )
        ),
        React.createElement(
          "div",
          { className: "flex flex-wrap max-w-6xl mx-auto justify-center" },
          React.createElement(Propositions, null),
          React.createElement(Propositions, null),
          React.createElement(Propositions, null),
          React.createElement(Propositions, null)
        )
      );
    }
  }]);

  return QuestionList;
}(React.Component);

var Propositions = function (_React$Component3) {
  _inherits(Propositions, _React$Component3);

  function Propositions() {
    _classCallCheck(this, Propositions);

    var _this3 = _possibleConstructorReturn(this, (Propositions.__proto__ || Object.getPrototypeOf(Propositions)).call(this));

    _this3.state = {
      black: true,
      isActive: false,
      correct: "Marquer comme bonne réponse"
    };
    _this3.handleClick = _this3.handleClick.bind(_this3);
    return _this3;
  }

  _createClass(Propositions, [{
    key: "handleClick",
    value: function handleClick() {
      this.setState({
        black: !this.state.black,
        correct: this.state.isActive ? "Marquer comme bonne réponse" : "Bonne réponse",
        isActive: !this.state.isActive
      });
    }
  }, {
    key: "render",
    value: function render() {
      var btn_class = this.state.black ? "blackButton" : "whiteButton";
      return React.createElement(
        "div",
        { className: "flex text-white my-5" },
        React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { className: btn_class, onClick: this.handleClick },
            React.createElement(
              "p",
              { className: "text-sm mr-1 " },
              this.state.correct
            ),
            React.createElement(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                className: "h-6 w-6",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              },
              React.createElement("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              })
            )
          ),
          React.createElement(
            "div",
            { className: "bg-gray-800  text-center py-5 px-8 flex font-display text-xl rounded-lg" },
            React.createElement("input", {
              type: "text",
              placeholder: "Proposition 1",
              className: "bg-gray-800 w-30 focus:outline-none text-center placeholder-gray-300"
            }),
            React.createElement(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                className: "h-5 w-5 ml-2",
                viewBox: "0 0 20 20",
                fill: "currentColor"
              },
              React.createElement("path", { d: "M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" })
            )
          )
        ),
        React.createElement(
          "div",
          { className: "flex text-white items-center mt-8", id: "localImage" },
          React.createElement(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: "h-10 w-10",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            },
            React.createElement("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            })
          ),
          React.createElement(
            "div",
            { className: "flex self-center" },
            React.createElement("input", { type: "file", className: "fileProposition" }),
            React.createElement(
              "label",
              {
                htmlFor: "file",
                className: "cursor-pointer md:w-40 3xl:text-4xl"
              },
              "Remplacer par une image"
            )
          )
        )
      );
    }
  }]);

  return Propositions;
}(React.Component);

var InputNumber = function (_React$Component4) {
  _inherits(InputNumber, _React$Component4);

  function InputNumber() {
    _classCallCheck(this, InputNumber);

    return _possibleConstructorReturn(this, (InputNumber.__proto__ || Object.getPrototypeOf(InputNumber)).apply(this, arguments));
  }

  _createClass(InputNumber, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "flex" },
        React.createElement(
          "h1",
          { className: "w-28 text-right mr-2 inline text-white font-display leading-5 my-auto" },
          "Nombre de propositions"
        ),
        React.createElement(
          "div",
          { className: "inline-flex items-center border-2 border-gray-500 rounded-md bg-gray-800 w-20" },
          React.createElement(
            "span",
            {
              className: "px-3 text-gray-400 w-10 text-center bg-gray-800" },
            this.props.count
          ),
          React.createElement(
            "div",
            { className: "flex flex-col ml-4 text-gray-500 border-l-2 py-1 border-gray-500" },
            React.createElement(
              "button",
              {
                type: "button",
                onClick: this.props.increment,
                className: "focus:outline-none focus:text-teal-500 border-b-2 border-gray-500"
              },
              React.createElement(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  className: "h-5 w-5",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                },
                React.createElement("path", {
                  fillRule: "evenodd",
                  d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",
                  clipRule: "evenodd"
                })
              )
            ),
            React.createElement(
              "button",
              {
                type: "button",
                onClick: this.props.decrement,
                className: "focus:outline-none focus:text-teal-500"
              },
              React.createElement(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  className: "h-5 w-5",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                },
                React.createElement("path", {
                  fillRule: "evenodd",
                  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                  clipRule: "evenodd"
                })
              )
            )
          )
        )
      );
    }
  }]);

  return InputNumber;
}(React.Component);

var Upload = function (_React$Component5) {
  _inherits(Upload, _React$Component5);

  function Upload(props) {
    _classCallCheck(this, Upload);

    var _this5 = _possibleConstructorReturn(this, (Upload.__proto__ || Object.getPrototypeOf(Upload)).call(this, props));

    _this5.state = {
      file: null,
      infos: "",
      hasImage: false
    };
    _this5.handleDeleteClick = _this5.handleDeleteClick.bind(_this5);
    _this5.handleChange = _this5.handleChange.bind(_this5);
    return _this5;
  }

  _createClass(Upload, [{
    key: "handleChange",
    value: function handleChange(event, selectorFiles, newValue) {
      this.setState({
        hasImage: true,
        file: URL.createObjectURL(event.target.files[0]),
        infos: event.target.files[0].name + "\t " + (event.target.files[0].size / 1000).toFixed(2) + "KB"
      });
    }
  }, {
    key: "handleDeleteClick",
    value: function handleDeleteClick() {
      this.setState({
        file: null,
        infos: "",
        hasImage: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var hasImage = this.state.hasImage;
      var text = void 0;
      if (!hasImage) {
        text = React.createElement(
          "div",
          null,
          React.createElement("input", { type: "file", onChange: this.handleChange, id: "file", className: "file", accept: "image/png, image/jpeg" }),
          React.createElement(
            "label",
            { htmlFor: "file", className: "cursor-pointer ml-5 md:w-40 3xl:text-4xl" },
            "Charger une image"
          )
        );
      } else {
        text = React.createElement(
          "div",
          null,
          React.createElement(
            "button",
            { onClick: this.handleDeleteClick },
            "Supprimer image"
          ),
          React.createElement(
            "span",
            { className: "file-name font-light ml-8 3xl:text-4xl text-white" },
            this.state.infos
          )
        );
      }

      return React.createElement(
        "div",
        { className: "flex flex-col justify-center self-center place-items-center mx-auto" },
        text,
        React.createElement("img", { src: this.state.file, width: "60%" })
      );
    }
  }]);

  return Upload;
}(React.Component);

var domContainer = document.querySelector("#creation-menu");
ReactDOM.render(React.createElement(CreationMenu, null), domContainer);