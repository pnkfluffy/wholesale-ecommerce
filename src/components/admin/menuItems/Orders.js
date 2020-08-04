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

export const OrderList = props => (
  <List {...props}>
    <Datagrid rowClick='show'>
      <ReferenceField
        label='User'
        link='show'
        source='user'
        reference='admin-users'
      >
        <TextField label='Name' source='name' />
      </ReferenceField>
      <NumberField
        label='Total'
        source='total'
        options={{ style: 'currency', currency: 'USD' }}
      />
      <NumberField label='# of Products' source='products.length' />
      <TextField label='Tracking Number' source='tracking.number' />
      <DateField label='Date' source='date' />
      <ShowButton />
    </Datagrid>
  </List>
)

export const OrderShow = props => (
  <Show actions={<OrderShowActions />} {...props}>
    <SimpleShowLayout>
      {/* <TextField label="User" source="user" reference="admin-users"/> */}
      <ReferenceField label='User' source='user' reference='admin-users'>
        <TextField label='Name' source='name' />
      </ReferenceField>
      <ReferenceField label='Email' source='user' reference='admin-users'>
        <TextField label='Email' source='email' />
      </ReferenceField>

      <NumberField
        label='Order Total'
        source='total'
        options={{ style: 'currency', currency: 'USD' }}
      />
      <TextField label='Order ID' source='id' />
      <ArrayField label='Products Ordered' source='products'>
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

const shippingCategories = [
  { id: 'USPS', name: 'USPS' },
  { id: 'UPS', name: 'UPS' },
  { id: 'Fedex', name: 'Fedex' }
]

export const OrderEdit = props => (
  <Edit undoable={false} actions={<OrderEditActions />} {...props}>
    <SimpleForm>
      <h2>User Information</h2>
      <ReferenceField label='User Email' source='user' reference='admin-users'>
        <TextField source='email' />
      </ReferenceField>
      <ReferenceField label='User Name' source='user' reference='admin-users'>
        <TextField source='name' />
      </ReferenceField>
      <TextInput disabled label='Order ID' source='id' />

      <NumberField
        label='Order Total'
        disabled
        source='total'
        options={{ style: 'currency', currency: 'USD' }}
      />
      <div className='order_show_tracking'>
        <h2>Tracking Information</h2>
        <AutocompleteInput
          label='Shipping Company'
          source='tracking.company'
          choices={shippingCategories}
        />
        <TextInput label='Tracking Number' source='tracking.number' />
      </div>
    </SimpleForm>
  </Edit>
)

//custom comps
const OrderShowActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <EditButton basePath={basePath} record={data} />
    <DeleteButton basePath={basePath} record={data} />
    <ListButton basePath={basePath} record={data} />
    {/* Add your custom actions */}
  </TopToolbar>
)

const OrderEditActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <ShowButton basePath={basePath} record={data} />
    <ListButton basePath={basePath} record={data} />
    {/* Add your custom actions */}
  </TopToolbar>
)
