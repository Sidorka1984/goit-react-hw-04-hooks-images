import styles from "./Searchbar.module.css";

const Searchbar = ({ onSearch }) => {

    const handleSearch = (e) => {
    e.preventDefault()
     onSearch (e.target.elements.articlesName.value)
      e.target.elements.articlesName.value = ' '
    }
  
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={handleSearch}>
          <button type="submit" className={styles.button}>
            <span className={styles.buttonLabel}>Search</span>
          </button>

          <input
            className={styles.input}
            type="text"
            autoComplete="off"
            autoFocus
            name="articlesName"
            placeholder="𝚂𝚎𝚊𝚛𝚌𝚑 𝚒𝚖𝚊𝚐𝚎𝚜"
          />
        </form>
      </header>
    )
  }

export default Searchbar

// class Searchbar extends Component {
  // state = {
    // query: "",
  // };
// 
  // handleInputChange = (e) => {
    // const { value } = e.target;
    // this.setState({ query: value });
  // };
// 
  // handleFormSubmit = (e) => {
    // e.preventDefault();
    // if (this.state.query.trim() === '') {
      // toast.error("Please enter a valid request");
      // return
        // }
    // this.props.onSubmit(this.state);
  // };
// 
  // handleClearSearchbar = () => {
    // this.setState({ query: "" });
  // };
// 
  // render() {
    // const { query } = this.state;
    // return (
      // <header className={styles.Searchbar}>
        // {/* <form className={styles.SearchForm} onSubmit={this.handleFormSubmit}> */}
          // {/* <button type="submit" className={styles.button}> */}
            // {/* <span className={styles.buttonLabel}>Search</span> */}
          // {/* </button> */}
          // {/* <input */}
            // className={styles.input}
            // type="text"
            // autoComplete="off"
            // autoFocus
            // placeholder="𝚂𝚎𝚊𝚛𝚌𝚑 𝚒𝚖𝚊𝚐𝚎𝚜 "
            // onChange={this.handleInputChange}
            // onClick={this.handleClearSearchbar}
            // value={query}
          // />
        // {/* </form> */}
      // {/* </header> */}
    // );
  // }
// }
// 
// Searchbar.propTypes = {
  // onSubmit: PropTypes.func.isRequired,
// };
// 
// export default Searchbar;
