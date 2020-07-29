import * as React from 'react'
import {
  CreateButton, ArrayField,
  List, Create, ReferenceField,
  Edit, SimpleForm, NumberField,
  TopToolbar, Button,
  Datagrid, TextField,
  TextInput, DateInput,
  DateField, EditButton,
  Show, SimpleShowLayout,
  DeleteButton, ListButton,
  RichTextField, ShowButton,
  DisabledInput, BooleanInput,
  LongTextInput, ReferenceManyField,
} from 'react-admin'

export const OrderShow = (props) => (
  <Show actions={< OrderActions />} {...props}>
      <SimpleShowLayout>
        <TextField label="User" source="user"/>
        <NumberField label="Order Total" source="total" options={{ style: 'currency', currency: 'USD' }} />
        <TextField label="Order ID" source="id"/>
        <ArrayField label="Products Ordered" source="products">
          <Datagrid rowClick="show">
            <NumberField label="Quantity" source="quantity"/>
            <ReferenceField label="Price Per Unit" source="product" reference="admin-products">
              <NumberField label="Price Per Unit" options={{ style: 'currency', currency: 'USD' }} source="price" />
            </ReferenceField>
            <ReferenceField label="Product" source="product" reference="admin-products">
              <TextField label="Product" source="name" />
            </ReferenceField>
          </Datagrid>
        </ArrayField>
        <ReferenceField label="User details" source="user" reference="admin-users">
          <TextField label="Product" source="name"/>
        </ReferenceField>
        
      </SimpleShowLayout>
  </Show>
);

export const OrderList = props => (
    <List {...props}>
        <Datagrid rowClick='show'>
          <ReferenceField label="User details" link="show" source="user" reference="admin-users">
            <TextField label="Name" source="name"/>
          </ReferenceField>
          <NumberField label="Total" source="total" options={{ style: 'currency', currency: 'USD' }}/>
          <DateField label="Date" source="date" />
          < ShowButton />
        </Datagrid>
      </List>
    )

//custom comps
const OrderActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    < ListButton basePath={basePath} record={data} />
      {/* Add your custom actions */}
  </TopToolbar>
);