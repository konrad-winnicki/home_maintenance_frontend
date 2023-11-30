import React from "react";
import ProductComponent from "./ProductComponent";

class ProductList extends React.Component {
  render() {
    return (
      <div>
        {this.props.product_list.map((product) => (
          <ProductComponent
            key={product.product_id}
            active_component={this.props.active_component}
            product={product}
            change_properties_in_db={this.props.change_properties_in_db}
            app_state={this.props.app_state}
            delete_function={this.props.delete_function}
            state_changer={this.props.state_changer}
            session_code={this.props.session_code}
            server_response_service={this.props.server_response_service}
          ></ProductComponent>
        ))}
      </div>
    );
  }
}

export default ProductList;
