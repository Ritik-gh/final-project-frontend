const Post = () => {
  return (
    <>
      <div className="container">
        <form className="d-flex flex-column align-items-center">
          <label>
            Select the property type
            <ul className="list-inline">
              <li className="list-inline-item">
                <button className="btn-v1" type="button">
                  FLAT
                </button>
              </li>
              <li className="list-inline-item">
                <button className="btn-v1" type="button">
                  HOUSE
                </button>
              </li>
            </ul>
          </label>
          <label htmlFor="">
            How many rooms it has?
            <ul className="list-inline">
              <li className="list-inline-item">
                <button className="btn-v1" type="button">
                  1
                </button>
              </li>
              <li className="list-inline-item">
                <button className="btn-v1" type="button">
                  2
                </button>
              </li>
              <li className="list-inline-item">
                <button className="btn-v1" type="button">
                  3
                </button>
              </li>
              <li className="list-inline-item">
                <button className="btn-v1" type="button">
                  4
                </button>
              </li>
              <li className="list-inline-item">
                <button className="btn-v1" type="button">
                  5
                </button>
              </li>
            </ul>
          </label>
          <label>
            What is the location of the property?
            <input
              type="search"
              name=""
              placeholder="Type in the location"
              id=""
            />
          </label>
          <label>
            What is the area of the property?
            <input type="number" name="" placeholder="type in the area" id="" />
          </label>
          <label>
            What is the base price you want?
            <input
              type="numbe"
              placeholder="type in the base price here"
            ></input>
          </label>
          <label>
            Describe your property
            <textarea
              rows="10"
              placeholder="Write something about your property"
            ></textarea>
          </label>
          <div className="file-uploader">
            <section className="img-holder">
              <label>
                <input
                  type="file"
                  name=""
                  placeholder="Add some images"
                  id=""
                  capture="image/*"
                  multiple
                />
              </label>
            </section>
            <p className="upload-status">msg</p>
          </div>
          <button className="btn-v1" type="submit">
            SELL
          </button>
          <button className="btn-v1" type="submit">
            RENT
          </button>
        </form>
      </div>
    </>
  );
};

export default Post;
