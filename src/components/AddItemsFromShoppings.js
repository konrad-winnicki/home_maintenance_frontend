import React from "react";

class AddItemsFromShopings extends React.Component {
    
    render() {
      return (
        <button
          type="button"
          className="btn btn-warning btn-sm"
          disabled={this.props.app_state !== "default" ? true : false}
          onClick={() => {
            this.props.state_changer({ app_state: "adding_checkedout_items" });
            
        }}
        >
          Add shoppings
        </button>
      );
    }
  }

  export default AddItemsFromShopings