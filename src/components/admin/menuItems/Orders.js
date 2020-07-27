import * as React from 'react'
import {
  CreateButton, ArrayField,
  List, Create, ReferenceField,
  Edit, SimpleForm,
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
        <TextField label="Order Total" source="total"/>
        <TextField label="Order ID" source="id"/>
        <ArrayField label="Products" source="products">
          <Datagrid>
            <TextField label="ID" source="id"/>
            <TextField label="Product Name" source="name" />
            <TextField label="Category" source="category"/>
            <TextField label="Price" source="price" />
          </Datagrid>
        </ArrayField>
        <ReferenceField label="User details" source="user" reference="Customers">
          <TextField label="Name" source="name"/>
        </ReferenceField>
      </SimpleShowLayout>
  </Show>
);

export const OrderList = props => (
    <List {...props}>
        <Datagrid rowClick='show'>
          {/* <TextField label='ID' source='id' /> */}
          {/* <TextField label="User" source="user" />
          <TextField label="Total" source="total" />
          <DateField label="Date" source="date" /> */}
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