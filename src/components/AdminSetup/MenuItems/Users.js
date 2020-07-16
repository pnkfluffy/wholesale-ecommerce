import * as React from 'react'
import {
  List,
  Create,
  Edit,
  SimpleForm,
  DisabledInput,
  BooleanInput,
  TextInput,
  DateInput,
  LongTextInput,
  ReferenceManyField,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  Show,
  SimpleShowLayout,
  RichTextField,
  ShowButton
} from 'react-admin'

export const UserShow = (props) => (
  <Show title="User Name" {...props}>
      <SimpleShowLayout>

          <TextField label="Payment confirmed: " source="paymentVerified" />
          <TextField label="DocuSign confirmed: " source="docusignVerified"/>
      </SimpleShowLayout>
  </Show>
);

export const UserList = props => (
  <List {...props}>
    <Datagrid rowClick='edit'>
      <TextField label='ID' source='id' />
      <TextField label='Name' source='name' />
      <TextField label='Google ID' source='googleID' />
      <TextField label='goCardless Verified' source='Verified' />
      <TextField label='goCardless ID' source='goCardlessID' />
      <TextField label='docusign Verified' source='docusignVerified' />
      < ShowButton />
    </Datagrid>
  </List>
)


export const UserEdit = props => (
  <Edit title={<UserTitle />} {...props}>
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

// const UserShowActions = ({ basePath, data, resource }) => (
//   <TopToolbar>
//       <EditButton basePath={basePath} record={data} />
//       {/* Add your custom actions */}
//       <Button color="primary" onClick={customAction}>Custom Action</Button>
//   </TopToolbar>
// );