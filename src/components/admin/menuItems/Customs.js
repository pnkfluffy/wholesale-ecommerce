import * as React from 'react'
import { cloneElement, useMemo } from 'react'

import {
  useNotify,
  useRefresh,
  useRedirect,
  List,
  Create,
  ArrayField,
  FunctionField,
  Edit,
  SimpleForm,
  NumberInput,
  DisabledInput,
  BooleanInput,
  BooleanField,
  ImageInput,
  TextInput,
  DateInput,
  ArrayInput,
  LongTextInput,
  ReferenceField,
  ReferenceManyField,
  Datagrid,
  TextField,
  SimpleFormIterator,
  DateField,
  EditButton,
  Show,
  SimpleShowLayout,
  RichTextField,
  ShowButton,
  TopToolbar,
  Button,
  ImageField,
  DeleteButton,
  ListButton,
  CreateButton,
  ExportButton,
  useListContext,
  sanitizeListRestProps,
  AutocompleteInput,
  AutocompleteArrayInput,
  ReferenceInput,
  ReferenceArrayInput,
  NumberField
} from 'react-admin'
import { makeStyles } from '@material-ui/core/styles'

export const CustomList = ({permissions, ...props}) => (
    <List {...props} actions={< CustomListActions />} bulkActionButtons={false}>
      <Datagrid rowClick='show'>
        <BooleanField label="active" source="active"/>
        <ReferenceField label="Customer" source="user" reference="admin-users">
            <TextField source="name"/>
        </ReferenceField>
        <TextField label="Order Title" source="name"/>
        <NumberField 
          label="Price Expected"
          source="standardPrice"
          options={{style: 'currency', currency: 'USD'}}
        />
        <NumberField
          label='Price Quoted'
          source='price'
          options={{ style: 'currency', currency: 'USD' }}
        />
        <DateField label="Date" source="date"/>
        {permissions === 'owner' && <DeleteButton basePath={props.basePath} record={props.data}/>}
        <ShowButton basePath={props.basePath} record={props.data} />
      </Datagrid>
    </List>
)

export const CustomShow = (props) => (
  <Show {...props}>
      <SimpleShowLayout>
          <BooleanField label="Active" source="active"/>
          <TextField label="Order Title" source="name" />
          <ReferenceField label="Employee" source="employee" reference="admin-users">
            <TextField source="name"/>
          </ReferenceField>
          <ReferenceField label="Customer" source="user" reference="admin-users">
            <TextField source="name"/>
          </ReferenceField>
          <TextField label="Description" source="description"/>
          <NumberField
            label='Expected Price'
            source='standardPrice'
            options={{ style: 'currency', currency: 'USD' }}
          />
          <NumberField
            label='Price Quoted'
            source='price'
            options={{ style: 'currency', currency: 'USD' }}
          />
          <ArrayField label="Products" source="products">
            <Datagrid>
              <NumberField label='Quantity' source="quantity"/>
              <ReferenceField label="Product" source="product" reference="admin-products">
                <TextField source="name"/>
              </ReferenceField>
            </Datagrid>
          </ArrayField>
          <DateField label="Publication date" source="date" />
      </SimpleShowLayout>
  </Show>
);

export const CustomCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput label='Title' source='name' />
      <ReferenceArrayInput label="Customer" source="user" reference="admin-users"
        helperText="This customer will recieve an email with the details for this order."
      >
        <AutocompleteInput
          options={{
            suggestionsContainerProps: {
              disablePortal: true
            }
          }}
        //below should prevent options from showing untill input is at a certain length. Doesn't work properly.
        // shouldRenderSuggestions={(val) => { return val.trim().length > 0}}
        />
      </ReferenceArrayInput>
      <ArrayInput label="Products" source="products">
        <SimpleFormIterator>
          <NumberInput label="Quantity" source="quantity" />
          <ReferenceArrayInput label="Product" source="name" reference="admin-products">
            <AutocompleteInput
              source="product"
              options={{
                suggestionsContainerProps: {
                  disablePortal: true
                }
              }}
            //below should prevent options from showing untill input is at a certain length. Doesn't work properly.
            // shouldRenderSuggestions={(val) => { return val.trim().length > 0}}
            />
          </ReferenceArrayInput>
        </SimpleFormIterator>
      </ArrayInput>
      <TextInput
        // options={{ multiLine: true }}
        label='Description'
        helperText="Detail the products and respective quantities this order will contain"
        source='description'
      />
      <NumberInput
        label='Total Price USD'
        source='price'
        min="0"
        max="5000"
        helperText="This is the custom quote the owner has decided to give for this order."
      />
    </SimpleForm>
  </Create>
)


//custom comps
const CustomListActions = ({ permissions, ...props }) => {
  const { className, exporter, filters, maxResults, ...rest } = props
  const {
    resource,
    displayedFilters,
    filterValues,
    basePath,
    showFilter
  } = useListContext()
  return (
    <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
      {filters &&
        cloneElement(filters, {
          resource,
          showFilter,
          displayedFilters,
          filterValues,
          context: 'button'
        })}
      {permissions === 'owner' && <DeleteButton basePath={basePath} />}
      <CreateButton basePath={basePath} />
      {/* <ExportButton
          disabled={total === 0}
          resource={resource}
          sort={currentSort}
          filterValues={filterValues}
          maxResults={maxResults}
        /> */}
      {/* Add your custom actions */}
    </TopToolbar>
  )
}

