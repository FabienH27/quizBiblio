class CreationMenu extends React.Component {
  render() {
    return <QuestionList />;
  }
}

class QuestionList extends React.Component {
  constructor(props) {
    super(props);

    this.displayProposition = [];

    this.handleChange = this.handleChange.bind(this);
    this.appendData = this.appendData.bind(this);

    this.state = {
      value: "",
      count: 2,
      maxValue: 4,
      minValue: 2,
      numPropositions: 2,
      showdata: this.displayProposition
    };
  }

  appendData(){
    for (var i = 0; i < this.state.count;i++){
      this.displayProposition.push(<Propositions key={i} id={i} />);
    }
    this.setState({
      showdata: this.displayProposition
    })
  }

  handleChange(selectorFiles, newValue) {
    this.setState({
      value:
        selectorFiles[0].name +
        "\t" +
        (selectorFiles[0].size / 1000).toFixed(2) +
        "KB",
    });
    setValue(newValue);
  }

  increment = () => {
    if (this.state.count >= this.state.maxValue) return;
    this.setState({
      count: this.state.count + 1
    });
  };

  decrement = () => {
    if (this.state.count <= this.state.minValue) return;
    this.setState({
      count: this.state.count - 1
    });
  };

  render() {
    this.displayProposition = [];
    for (var i = 0; i < this.state.count;i++){
      this.displayProposition.push(<Propositions key={i} id={i} />);
    }
    return (
      <article className=" p-5 ">
        <div className="max-w-2xl mx-auto">
          <div className="flex font-display text-white">
            <h1 className="text-2xl my-5">Question 1</h1>
            <button className="flex items-center focus:outline-none ml-10">
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
              <h1>Supprimer</h1>
            </button>
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
          <div
            className="text-5xl my-5 text-teal-500 font-bold focus:outline-none"
            contentEditable="true"
            data-placeholder="Intitulé de la question"
          ></div>
          <div>
            <InputNumber
              count={this.state.count}
              increment={this.increment}
              decrement={this.decrement}
            />
          </div>
        </div>
        <div className="flex flex-wrap max-w-6xl mx-auto justify-center mb-56">
             {this.displayProposition}
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
      correct: "Marquer comme bonne réponse",
      content: null,
      image: "Remplacer par une image",
      file: null,
      infos: "",
      hasImage: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleClick() {
    this.setState({
      black: !this.state.black,
      correct: this.state.isActive ? "Marquer comme bonne réponse" : "Bonne réponse",
      isActive: !this.state.isActive,
    });
  }

  handleImageChange(event){
    console.log(this.state);

    this.setState({
      hasImage: true,
      file: URL.createObjectURL(event.target.files[0]),
      infos:
      event.target.files[0].name +
      "\t " +
      (event.target.files[0].size / 1000).toFixed(2) +
      "KB"  
    });
  }

  handleDeleteClick() {
    this.setState({
      file: null,
      infos: "",
      content:null,
      hasImage: false,
    })
  }

  render() {
    let btn_class = this.state.black ? "blackButton" : "whiteButton";
    let hasImage = this.state.hasImage;
    let contentImage;

    if(!hasImage){
        this.state.content = <div className="flex">
        <input
          type="text"
          placeholder={"proposition " + (this.props.id+1)}
          className="bg-gray-800 w-30 focus:outline-none text-center  placeholder-gray-300"
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
      contentImage = <div>
        <input type="file" id={this.props.id} className="fileProposition"
          onChange={this.handleImageChange} accept="image/png, image/jpeg" />
        <label
          htmlFor={this.props.id}
          className="cursor-pointer md:w-40 3xl:text-4xl"> Remplacer par une image
        </label>
      </div>
    }else{
      this.state.content = <div>
        <img src={this.state.file} className="w-32"/>
      </div>;
      contentImage = <button onClick={this.handleDeleteClick}>Supprimer l'image</button>
    }

    return (
      <div className="text-white my-5 flex items-center">
        <div>
          <div className={btn_class} onClick={this.handleClick}>
            <p className="text-sm mr-1 ">{this.state.correct}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </div>
          <div className="bg-gray-800 text-center py-5 px-8 font-display text-xl rounded-lg">
            {this.state.content}
          </div>
        </div>
        <div className="flex text-white items-center mt-8" id="localImage">
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
            {contentImage}
          </div>
        </div>
      </div>
    );
  }
}

class Upload extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      file: null,
      infos: "",
      hasImage: false
    }
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      hasImage: true,
      file: URL.createObjectURL(event.target.files[0]),
      infos:
      event.target.files[0].name +
      "\t " +
      (event.target.files[0].size / 1000).toFixed(2) +
      "KB"
    });
  }

  handleDeleteClick() {
    this.setState({
      file: null,
      infos: "",
      hasImage: false,
    })
  }

  render() {
    const hasImage = this.state.hasImage;
    let text;
    if(!hasImage) {
      text = <div>
        <input type="file" onChange={this.handleChange} id="file" className="file" accept="image/png, image/jpeg"/>
        <label htmlFor="file" className="cursor-pointer ml-5 md:w-40 3xl:text-4xl">Charger une image</label>
    </div>
    }else{
      text = <div>
        <button onClick={this.handleDeleteClick}>Supprimer image</button>
        <span className="file-name font-light ml-8 3xl:text-4xl text-white">{this.state.infos}</span>
      </div>
    }

    return (
      <div className="flex flex-col justify-center self-center place-items-center mx-auto">
        {text}
        <img src={this.state.file} width="60%" />
      </div>
    );
  }
}

class InputNumber extends React.Component {
  render() {
    return (
      <div className="flex">
        <h1 className="w-28 text-right mr-2 inline text-white font-display leading-5 my-auto">
          Nombre de propositions
        </h1>
        <div className="inline-flex items-center border-2 border-gray-500 rounded-md bg-gray-800 w-20">
          <span
            className="px-3 text-gray-400 w-10 text-center bg-gray-800">{this.props.count}</span>
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
