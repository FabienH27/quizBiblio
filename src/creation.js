maxlengthContentEditableModule.maxlengthContentEditable();
class CreationMenu extends React.Component {
  state = {
    count: 0, 
  }

  constructor() {
    super()
    this.displayQuestion = [];
    this.appendQuestion = this.appendQuestion.bind(this);
    this.removeQuestion = this.removeQuestion.bind(this);
  };

  appendQuestion(){
    this.setState({
      count: this.state.count + 1
    })
  }

  removeQuestion(){
    this.setState({
      count: this.state.count - 1
    });   
  }

  render() {
    this.displayQuestion = [<Question key={0} id={0} />];
    for (var i = 1; i <= this.state.count; i++) {
      this.displayQuestion.push(<Question key={i} id={i} />);
    }
    return(
      <div className="my-5">
        {this.displayQuestion}
        <div className="flex 3xl:max-w-7xl max-w-3xl mx-auto justify-end font-title py-12">
          <button onClick={this.appendQuestion} type="submit" className="text-white mx-2 bg-teal-500 px-5 py-2 rounded-md 3xl:px-8 3xl:py-5 3xl:text-2xl focus:bg-teal-600 focus:outline-none">
            Ajouter une question
          </button>
          <button onClick={this.removeQuestion} type="submit" className="text-white mx-2 bg-teal-500 px-5 py-2 rounded-md 3xl:px-8 3xl:py-5 3xl:text-2xl focus:bg-teal-600 focus:outline-none">
            Supprimer une question
          </button>
          <button className="text-white mx-2 bg-teal-500 px-5 py-2 rounded-md 3xl:px-8 3xl:py-5 3xl:text-2xl focus:bg-teal-600 focus:outline-none">
            Valider le quiz
          </button>
        </div>
      </div>
    ) 
  }
}

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.displayProposition = [];
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: "",
      count: 2,
      maxValue: 4,
      minValue: 2,
      numPropositions: 2,
    };
  }

  handleChange(selectorFiles, newValue) {
    this.setState({
      value:
        selectorFiles[0].name +
        "\t" +
        (selectorFiles[0].size / 1000).toFixed(2) +
        "KB",
    });
  }

  increment = () => {
    if (this.state.count >= this.state.maxValue) return;
    this.setState({
      count: this.state.count + 1,
    });
  };

  decrement = () => {
    if (this.state.count <= this.state.minValue) return;
    this.setState({
      count: this.state.count - 1,
    });
  };

  auto_grow(element) {
    element.style.height = "5px";
    element.style.height = element.scrollHeight + "px";
  }

  render() {
    this.displayProposition = [];
    for (var i = 0; i < this.state.count; i++) {
      this.displayProposition.push(<Propositions key={i} id={i} />);
    }
    return (
      <article className="p-5">
        <div className="max-w-2xl mx-auto 3xl:max-w-screen-xl">
          <div className="flex font-display text-white">
            <h1 className="text-2xl my-5 3xl:text-4xl">{"Question " + (this.props.id + 1)}</h1>
            {/*<button className="flex items-center focus:outline-none ml-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-500 "
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <h1 className="3xl:text-xl">Supprimer</h1>
            </button>*/}
          </div>
          <div className="flex text-white" id="localImage">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <div className="flex self-center">
              <Upload id="file" />
            </div>
          </div>
          <textarea
            className="text-5xl my-5 text-teal-500
            font-bold bg-gray-700 decoration-clone focus:outline-none placeholder-teal-500 placeholder-opacity-50"
            id="question"
            placeholder="Intitulé de la question"
            rows={1}
            maxLength="100"
          ></textarea>
          <div>
            <InputNumber
              count={this.state.count}
              increment={this.increment}
              decrement={this.decrement}
            />
          </div>
        </div>
        <div className="flex flex-wrap max-w-2xl 3xl:max-w-7xl self-center justify-evenly mx-auto ">
          {this.displayProposition}
        </div>
        <div className=" max-w-xl mx-auto font-display mt-8">
          <textarea
            type="text"
            onInput={this.auto_grow} maxLength="255"
            className="w-full  bg-gray-800 px-8 py-5
              focus:outline-none focus:placeholder-teal-500 placeholder-gray-500 text-white text-lg 3xl:text-xl"
            placeholder="Saisir une explication (facultatif - 255 caractères )"
          ></textarea>
        </div>
      </article>
    );
  }
}

class Propositions extends React.Component {
  constructor() {
    super();
    this.state = {
      black: true,
      isActive: false,
      correct: "Bonne réponse",
      content: null,
      image: "Remplacer par une image",
      file: null,
      infos: "",
      hasImage: false,
      selectedProposition: "prop1",
    };
    //this.handleClick = this.handleClick.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  handleImageChange(event) {
    this.setState({
      hasImage: true,
      file: URL.createObjectURL(event.target.files[0]),
      infos:
        event.target.files[0].name +
        "\t " +
        (event.target.files[0].size / 1000).toFixed(2) +
        "KB",
    });
  }

  handleDeleteClick() {
    this.setState({
      file: null,
      infos: "",
      content: null,
      hasImage: false,
    });
  }

  onValueChange(event) {
    this.setState({
      isActive: !this.state.isActive,
      selectedProposition: event.target.id,
    });

    for (var i = 0; i < document.getElementsByName("proposition").length; i++)
      document.getElementsByName("proposition")[i].parentNode.parentNode.parentNode.classList.remove("valid");
    document.getElementById(event.target.id).parentNode.parentNode.parentNode.classList.add("valid");
  }

  render() {
    let hasImage = this.state.hasImage;
    let contentImage;
    let text = this.state.correct;

    if (!hasImage) {
      this.state.content = (
        <div className="flex justify-center items-center">
          <textarea
            rows={1} maxLength={50}
            type="text"
            placeholder={"proposition " + (this.props.id + 1)}
            className="bg-gray-800 w-30 focus:outline-none text-center placeholder-gray-300 3xl:text-3xl 3xl:my-2"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </div>
      );
      contentImage = (
        <div>
          <input
            type="file"
            id={this.props.id}
            className="fileProposition"
            onChange={this.handleImageChange}
            accept="image/png, image/jpeg"
          />
          <label
            htmlFor={this.props.id}
            className="cursor-pointer md:w-40 3xl:text-xl">
            Remplacer par une image
          </label>
        </div>
      );
    } else {
      this.state.content = (
        <div>
          <img src={this.state.file} className="w-48" />
        </div>
      );
      contentImage = (
        <button onClick={this.handleDeleteClick} className="hover:text-teal-500 focus:outline-none">Supprimer l'image</button>
      );
    }

    return (
      <div className="text-white mt-8 flex items-center 3xl:w-6/12 justify-center">
        <div>
          <div className="flex justify-between items-center prop">
            <div className="items-start flex">
              <div className="flex text-white items-center w-36 3xl:w-80"id="localImage">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {contentImage}
              </div>
            </div>
            <div>
              <input
                type="radio"
                id={"prop" + this.props.id}
                name="proposition"
                className="hidden"
                onChange={this.onValueChange} 
              />
              <label htmlFor={"prop" + this.props.id} className="flex">
                <p className="text-sm mr-1 text-center 3xl:text-xl">{text}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </label>
            </div>
          </div>
          <div className="bg-gray-800 text-center py-5 px-8 font-display text-xl rounded-lg">
            {this.state.content}
          </div>
        </div>
      </div>
    );
  }
}

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      infos: "",
      hasImage: false,
    };
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      hasImage: true,
      file: URL.createObjectURL(event.target.files[0]),
      infos:
        event.target.files[0].name +
        "\t " +
        (event.target.files[0].size / 1000).toFixed(2) +
        "KB",
    });
  }

  handleDeleteClick() {
    this.setState({
      file: null,
      infos: "",
      hasImage: false,
    });
  }

  render() {
    const hasImage = this.state.hasImage;
    let text;
    if (!hasImage) {
      text = (
        <div>
          <input
            type="file"
            onChange={this.handleChange}
            id="file"
            className="file"
            accept="image/png, image/jpeg"
          />
          <label
            htmlFor="file"
            className="cursor-pointer ml-5 md:w-40 3xl:text-3xl">
            Charger une image
          </label>
        </div>
      );
    } else {
      text = (
        <div>
          <button onClick={this.handleDeleteClick} className="3xl:text-3xl">Supprimer image</button>
          <span className="file-name font-light ml-8 3xl:text-3xl text-white">
            {this.state.infos}
          </span>
        </div>
      );
    }

    return (
      <div className="flex flex-col justify-center self-center place-items-center mx-auto">
        {text}
        <img src={this.state.file} width="50%" className="mt-2" />
      </div>
    );
  }
}

class InputNumber extends React.Component {
  render() {
    return (
      <div className="flex">
        <h1 className="w-28 text-right mr-2 inline text-white font-display leading-5 my-auto 3xl:text-xl">
          Nombre de propositions
        </h1>
        <div className="inline-flex items-center border-2 border-gray-500 rounded-md bg-gray-800 w-20">
          <span className="px-3 text-gray-400 w-10 text-center bg-gray-800">
            {this.props.count}
          </span>
          <div className="flex flex-col ml-4 text-gray-500 border-l-2 py-1 border-gray-500">
            <button
              type="button"
              onClick={this.props.increment}
              className="focus:outline-none focus:text-teal-500 border-b-2 border-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={this.props.decrement}
              className="focus:outline-none focus:text-teal-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
let domContainer = document.querySelector("#creation-menu");
ReactDOM.render(<CreationMenu />, domContainer);
