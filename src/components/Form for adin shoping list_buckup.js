<div className="col text-center">
            <input
              value={this.state.name}
              disabled={this.props.app_state !== "default" ? true : false}
              className="form-control input-lg"
              type="text"
              placeholder="Type product name"
              onChange={this.handleChangeName}
            ></input>
          </div>
          <div className="col text-center">
            <input
              value={this.state.quantity}
              disabled={this.props.app_state !== "default" ? true : false}
              className="form-control input-lg"
              type="number"
              placeholder="Quantity"
              onChange={this.handleChangeQuantity}
            ></input>
          </div>
          <div className="col text-left">
            <button
              disabled={this.state.app_state !== "default" ? true : false}
              className="btn btn-primary"
              onClick={() => {
                this.shopping_list_state_changer({
                  app_state: "button_clicked",
                });
                this.add_product();
              }}
            >
              <MdAddBox />
            </button>
          </div>