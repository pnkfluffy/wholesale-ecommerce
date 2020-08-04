import * as React from 'react'
import {
  CreateButton,
  ArrayField,
  List,
  Create,
  ReferenceField,
  Edit,
  SimpleForm,
  NumberField,
  TopToolbar,
  Button,
  Datagrid,
  TextField,
  TextInput,
  DateInput,
  ArrayInput,
  NumberInput,
  DateField,
  EditButton,
  Show,
  SimpleShowLayout,
  DeleteButton,
  AutocompleteInput,
  ListButton,
  RichTextField,
  ShowButton,
  DisabledInput,
  BooleanInput,
  LongTextInput,
  ReferenceManyField
} from 'react-admin'

export const CommissionList = props => (
  <List {...props}>
    <Datagrid rowClick='show'>
      <ReferenceField
        label='User'
        link='show'
        source='user'
        reference='admin-users'
      >
        <TextField label='Name' source='email' />
      </ReferenceField>
      <ReferenceField
        label='Representative'
        link='show'
        source='representative'
        reference='admin-users'
      >
        <TextField label='Name' source='email' />
      </ReferenceField>
      <NumberField
        label='Total'
        source='total'
        options={{ style: 'currency', currency: 'USD' }}
      />
      <DateField label='Date' source='date' />
      <ShowButton />
    </Datagrid>
  </List>
)

export const CommissionShow = props => (
  <Show actions={<CommissionShowActions />} {...props}>
    <SimpleShowLayout>
      {/* <TextField label="User" source="user" reference="admin-users"/> */}
      <ReferenceField label='User Email' source='user' reference='admin-users'>
        <TextField label='email' source='email' />
      </ReferenceField>
      <ReferenceField label='User Name' source='user' reference='admin-users'>
        <TextField label='Name' source='name' />
      </ReferenceField>
      <ReferenceField
        label='Representative'
        link='show'
        source='representative'
        reference='admin-users'
      >
        <TextField label='Name' source='email' />
      </ReferenceField>
      <NumberField
        label='Order Total'
        source='total'
        options={{ style: 'currency', currency: 'USD' }}
      />
      <TextField label='Order ID' source='id' />
      <ArrayField label='Products Prdereded' source='products'>
        <Datagrid rowClick='show'>
          <NumberField label='Quantity' source='quantity' />
          <ReferenceField
            label='Price Per Unit'
            source='product'
            reference='admin-products'
          >
            <NumberField
              label='Price Per Unit'
              options={{ style: 'currency', currency: 'USD' }}
              source='price'
            />
          </ReferenceField>
          <ReferenceField
            label='Product'
            source='product'
            reference='admin-products'
          >
            <TextField label='Product' source='name' />
          </ReferenceField>
        </Datagrid>
      </ArrayField>
      <h2>Tracking Information</h2>
      <TextField label='Shipping Company' source='tracking.company' />
      <TextField label='Tracking Number' source='tracking.number' />
    </SimpleShowLayout>
  </Show>
)

//custom comps
const CommissionShowActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <EditButton basePath={basePath} record={data} />
    <DeleteButton basePath={basePath} record={data} />
    <ListButton basePath={basePath} record={data} />
    {/* Add your custom actions */}
  </TopToolbar>
)
