import * as React from 'react'
import {
  List,
  Create,
  Edit,
  SimpleForm,
  ArrayField,
  DisabledInput,
  BooleanInput,
  TextInput,
  DateInput,
  ReferenceField,
  LongTextInput,
  ReferenceManyField,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  Show,
  SimpleShowLayout,
  RichTextField,
  ShowButton,
  TopToolbar,
  Button,
  DeleteButton,
  ListButton,
  CreateButton,
  useQuery,
  Loading,
  Error
} from 'react-admin'

const GetUserOrders = userData => {
  console.log(userData)
  const { data, loading, error } = useQuery({
    type: 'getManyReference',
    resource: 'orders',
    payload: { user: userData.id }
  })
  if (loading) return <Loading />
  if (error) return <Error />
  if (!data) return null
  return (
    <ul>
      {data.map(item => {
        return <li key={item.total}>{item.products}</li>
      })}
    </ul>
  )
}

export const UserShow = props => {
  console.log('usershow', props)
  return (
    <Show actions={<UserShowActions />} {...props}>
      <SimpleShowLayout>
        <TextField label='Full Name' source='name' />
        <TextField label='Payment confirmed' source='paymentVerified' />
        <TextField label='DocuSign confirmed' source='docusignVerified' />
        <ArrayField label='Favorites' source='favorites'>
          <Datagrid>
            <TextField label='ID' source='id' />
            <TextField label='Product Name' source='name' />
            <TextField label='Category' source='category' />
            <TextField label='Price' source='price' />
          </Datagrid>
        </ArrayField>
        <ReferenceField
          label='Order History'
          source='id'
          reference='admin-orders'
          sortBy='user'
        >
          <TextField label='Total Price' source='total' />
        </ReferenceField>
        <TextField label='Database ID' source='id' />
        <TextField label='Google ID' source='googleID' />
        <TextField label='goCardless ID' source='goCardlessID' />
        {/* <Button color="primary">See Order History</Button> */}
      </SimpleShowLayout>
    </Show>
  )
}

export const UserList = props => (
  <List {...props}>
    <Datagrid rowClick='show'>
      {/* <TextField label='ID' source='id' /> */}
      <TextField label='Name' source='name' />
      <TextField label='Database ID' source='id' />
      <ShowButton />
      <DeleteButton />
    </Datagrid>
  </List>
)

export const UserEdit = props => (
  <Edit actions={<UserEditActions />} title={<UserTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source='id' />
      {/* {!} NEEDS TO BE DONE LATER TO EDIT ORDERS OF USERS */}
      {/* <ReferenceInput source="orderId" reference="orders"> */}

      <TextInput label='name' source='name' />
      <BooleanInput
        disabled
        label='Payment Verified'
        source='paymentVerified'
      />
      <BooleanInput
        label='Enable Purchases (form signed)'
        source='docusignVerified'
      />
      <TextInput disabled label='goCardless ID' source='goCardlessID' />
    </SimpleForm>
  </Edit>
)

// custom components

const UserTitle = ({ record }) => {
  return <span>Post {record ? `"${record.name}"` : ''}</span>
}
const UserShowActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <EditButton basePath={basePath} record={data} />
    <DeleteButton basePath={basePath} record={data} />
    <ListButton basePath={basePath} record={data} />
    {/* Add your custom actions */}
  </TopToolbar>
)
const UserEditActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <ShowButton basePath={basePath} record={data} />
    <DeleteButton basePath={basePath} record={data} />
    <ListButton basePath={basePath} record={data} />
    {/* Add your custom actions */}
  </TopToolbar>
)
