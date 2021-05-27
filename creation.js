var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CreationMenu = function (_React$Component) {
  _inherits(CreationMenu, _React$Component);

  function CreationMenu() {
    _classCallCheck(this, CreationMenu);

    var _this = _possibleConstructorReturn(this, (CreationMenu.__proto__ || Object.getPrototypeOf(CreationMenu)).call(this));

    _this.state = {
      count: 0
    };

    _this.displayQuestion = [];
    _this.appendQuestion = _this.appendQuestion.bind(_this);
    _this.removeQuestion = _this.removeQuestion.bind(_this);
    return _this;
  }

  _createClass(CreationMenu, [{
    key: "appendQuestion",
    value: function appendQuestion() {
      this.setState({
        count: this.state.count + 1
      });
    }
  }, {
    key: "removeQuestion",
    value: function removeQuestion() {
      this.setState({
        count: this.state.count - 1
      });
    }
  }, {
    key: "render",
    value: function render() {
      this.displayQuestion = [React.createElement(Question, { key: 0, id: 0 })];
      for (var i = 1; i <= this.state.count; i++) {
        this.displayQuestion.push(React.createElement(Question, { key: i, id: i }));
      }
      return React.createElement(
        "div",
        { className: "my-5" },
        this.displayQuestion,
        React.createElement(
          "div",
          { className: "flex 3xl:max-w-7xl max-w-3xl mx-auto justify-end font-title py-12" },
          React.createElement(
            "button",
            { onClick: this.appendQuestion, type: "button", className: "text-white mx-2 bg-teal-500 px-5 py-2 rounded-md 3xl:px-8 3xl:py-5 3xl:text-2xl hover:bg-teal-600 focus:outline-none" },
            "Ajouter une question"
          ),
          React.createElement(
            "button",
            { onClick: this.removeQuestion, type: "button", className: "text-white mx-2 bg-teal-500 px-5 py-2 rounded-md 3xl:px-8 3xl:py-5 3xl:text-2xl hover:bg-teal-600 focus:outline-none" },
            "Supprimer une question"
          ),
          React.createElement(
            "button",
            { type: "submit", className: "text-white mx-2 bg-teal-500 px-5 py-2 rounded-md 3xl:px-8 3xl:py-5 3xl:text-2xl hover:bg-teal-600 focus:outline-none" },
            "Valider le quiz"
          )
        )
      );
    }
  }]);

  return CreationMenu;
}(React.Component);

var Question = function (_React$Component2) {
  _inherits(Question, _React$Component2);

  function Question(props) {
    _classCallCheck(this, Question);

    var _this2 = _possibleConstructorReturn(this, (Question.__proto__ || Object.getPrototypeOf(Question)).call(this, props));

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

    _this2.displayProposition = [];
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

  _createClass(Question, [{
    key: "handleChange",
    value: function handleChange(selectorFiles, newValue) {
      this.setState({
        value: selectorFiles[0].name + "\t" + (selectorFiles[0].size / 1000).toFixed(2) + "KB"
      });
    }
  }, {
    key: "auto_grow",
    value: function auto_grow(element) {
      element.style.height = "5px";
      element.style.height = element.scrollHeight + "px";
    }
  }, {
    key: "render",
    value: function render() {
      this.displayProposition = [];
      for (var i = 0; i < this.state.count; i++) {
        this.displayProposition.push(React.createElement(Propositions, { key: i, id: i, question: this.props.id }));
      }
      return React.createElement(
        "article",
        { className: "p-5" },
        React.createElement(
          "div",
          { className: "max-w-2xl mx-auto 3xl:max-w-screen-xl" },
          React.createElement(
            "div",
            { className: "flex font-display text-white" },
            React.createElement(
              "h1",
              { className: "text-2xl my-5 3xl:text-4xl" },
              "Question " + (this.props.id + 1)
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
              React.createElement(Upload, { id: "file", name: "imageQ" + (this.props.id + 1) })
            )
          ),
          React.createElement("textarea", {
            className: "text-5xl my-5 text-teal-500\r font-bold bg-gray-700 decoration-clone focus:outline-none placeholder-teal-500 placeholder-opacity-50",
            id: "question", name: "question" + (this.props.id + 1),
            placeholder: "Intitul\xE9 de la question",
            rows: 1,
            maxLength: "100"
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
          { className: "flex flex-wrap max-w-2xl 3xl:max-w-7xl self-center justify-evenly mx-auto " },
          this.displayProposition
        ),
        React.createElement(
          "div",
          { className: " max-w-xl mx-auto font-display mt-8" },
          React.createElement("textarea", {
            type: "text", name: "explication-q" + (this.props.id + 1),
            onInput: this.auto_grow, maxLength: "255",
            className: "w-full  bg-gray-800 px-8 py-5\r focus:outline-none focus:placeholder-teal-500 placeholder-gray-500 text-white text-lg 3xl:text-xl",
            placeholder: "Saisir une explication (facultatif - 255 caract\xE8res )"
          })
        )
      );
    }
  }]);

  return Question;
}(React.Component);

var Propositions = function (_React$Component3) {
  _inherits(Propositions, _React$Component3);

  function Propositions() {
    _classCallCheck(this, Propositions);

    var _this3 = _possibleConstructorReturn(this, (Propositions.__proto__ || Object.getPrototypeOf(Propositions)).call(this));

    _this3.state = {
      black: true,
      isActive: false,
      correct: "Bonne réponse",
      content: null,
      image: "Remplacer par une image",
      file: null,
      infos: "",
      hasImage: false,
      selectedProposition: "prop1"
    };
    //this.handleClick = this.handleClick.bind(this);
    _this3.handleImageChange = _this3.handleImageChange.bind(_this3);
    _this3.handleDeleteClick = _this3.handleDeleteClick.bind(_this3);
    _this3.onValueChange = _this3.onValueChange.bind(_this3);
    return _this3;
  }

  _createClass(Propositions, [{
    key: "handleImageChange",
    value: function handleImageChange(event) {
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
        content: null,
        hasImage: false
      });
    }
  }, {
    key: "onValueChange",
    value: function onValueChange(event) {
      this.setState({
        isActive: !this.state.isActive,
        selectedProposition: event.target.id
      });

      for (var i = 0; i < document.getElementsByName("proposition").length; i++) {
        document.getElementsByName("proposition")[i].parentNode.parentNode.parentNode.classList.remove("valid");
      }document.getElementById(event.target.id).parentNode.parentNode.parentNode.classList.add("valid");
    }
  }, {
    key: "render",
    value: function render() {
      var hasImage = this.state.hasImage;
      var contentImage = void 0;
      var text = this.state.correct;

      if (!hasImage) {
        this.state.content = React.createElement(
          "div",
          { className: "flex justify-center items-center" },
          React.createElement("textarea", {
            rows: 1, maxLength: 50,
            type: "text", name: "proposition" + (this.props.question + 1) + "-" + (this.props.id + 1),
            placeholder: "proposition " + (this.props.id + 1),
            className: "bg-gray-800 w-30 focus:outline-none text-center placeholder-gray-300 3xl:text-3xl 3xl:my-2"
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
        );
        contentImage = React.createElement(
          "div",
          null,
          React.createElement("input", {
            type: "file", name: "imageProp" + (this.props.id + 1),
            id: this.props.id,
            className: "fileProposition",
            onChange: this.handleImageChange,
            accept: "image/png, image/jpeg"
          }),
          React.createElement(
            "label",
            {
              htmlFor: this.props.id,
              className: "cursor-pointer md:w-40 3xl:text-xl" },
            "Remplacer par une image"
          )
        );
      } else {
        this.state.content = React.createElement(
          "div",
          null,
          React.createElement("img", { src: this.state.file, className: "w-48" })
        );
        contentImage = React.createElement(
          "button",
          { onClick: this.handleDeleteClick, className: "hover:text-teal-500 focus:outline-none" },
          "Supprimer l'image"
        );
      }

      return React.createElement(
        "div",
        { className: "text-white mt-8 flex items-center 3xl:w-6/12 justify-center" },
        React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { className: "flex justify-between items-center prop" },
            React.createElement(
              "div",
              { className: "items-start flex" },
              React.createElement(
                "div",
                { className: "flex text-white items-center w-36 3xl:w-80", id: "localImage" },
                React.createElement(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    className: "h-12 w-12",
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
                contentImage
              )
            ),
            React.createElement(
              "div",
              null,
              React.createElement("input", {
                type: "radio",
                id: "prop" + this.props.id,
                name: "proposition",
                className: "hidden",
                onChange: this.onValueChange
              }),
              React.createElement(
                "label",
                { htmlFor: "prop" + this.props.id, className: "flex" },
                React.createElement(
                  "p",
                  { className: "text-sm mr-1 text-center 3xl:text-xl" },
                  text
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
              )
            )
          ),
          React.createElement(
            "div",
            { className: "bg-gray-800 text-center py-5 px-8 font-display text-xl rounded-lg" },
            this.state.content
          )
        )
      );
    }
  }]);

  return Propositions;
}(React.Component);

var Upload = function (_React$Component4) {
  _inherits(Upload, _React$Component4);

  function Upload(props) {
    _classCallCheck(this, Upload);

    var _this4 = _possibleConstructorReturn(this, (Upload.__proto__ || Object.getPrototypeOf(Upload)).call(this, props));

    _this4.state = {
      file: null,
      infos: "",
      hasImage: false
    };
    _this4.handleDeleteClick = _this4.handleDeleteClick.bind(_this4);
    _this4.handleChange = _this4.handleChange.bind(_this4);
    return _this4;
  }

  _createClass(Upload, [{
    key: "handleChange",
    value: function handleChange(event) {
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
          React.createElement("input", {
            type: "file",
            onChange: this.handleChange,
            id: "file",
            className: "file",
            accept: "image/png, image/jpeg"
          }),
          React.createElement(
            "label",
            {
              htmlFor: "file",
              className: "cursor-pointer ml-5 md:w-40 3xl:text-3xl" },
            "Charger une image"
          )
        );
      } else {
        text = React.createElement(
          "div",
          null,
          React.createElement(
            "button",
            { onClick: this.handleDeleteClick, className: "3xl:text-3xl" },
            "Supprimer image"
          ),
          React.createElement(
            "span",
            { className: "file-name font-light ml-8 3xl:text-3xl text-white" },
            this.state.infos
          )
        );
      }

      return React.createElement(
        "div",
        { className: "flex flex-col justify-center self-center place-items-center mx-auto" },
        text,
        React.createElement("img", { src: this.state.file, width: "50%", className: "mt-2" })
      );
    }
  }]);

  return Upload;
}(React.Component);

var InputNumber = function (_React$Component5) {
  _inherits(InputNumber, _React$Component5);

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
          { className: "w-28 text-right mr-2 inline text-white font-display leading-5 my-auto 3xl:text-xl" },
          "Nombre de propositions"
        ),
        React.createElement(
          "div",
          { className: "inline-flex items-center border-2 border-gray-500 rounded-md bg-gray-800 w-20" },
          React.createElement(
            "span",
            { className: "px-3 text-gray-400 w-10 text-center bg-gray-800" },
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

var domContainer = document.querySelector("#creation-menu");
ReactDOM.render(React.createElement(CreationMenu, null), domContainer);