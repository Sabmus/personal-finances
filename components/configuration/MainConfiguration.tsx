'use client';

import { useState } from 'react';
import { ConfigurationNav, SubConfiguration, UserSettings } from '@/components/configuration';
import { IMainConfigurationProps } from '@/lib/definitions';
import { createCategory, editCategory, deleteCategory } from '@/lib/actions/categoryActions';
import {
  createPaymentMethod,
  editPaymentMethod,
  deletePaymentMethod,
} from '@/lib/actions/paymentMethodsActions';
import { createGroup, editGroup, deleteGroup } from '@/lib/actions/groupActions';
import { editUserData } from '@/lib/actions/userDataActions';

const MainConfiguration = ({
  configurationList,
  categories,
  paymentMethods,
  groups,
  userData,
}: IMainConfigurationProps) => {
  const [activeConfiguration, setActiveConfiguration] = useState(0);

  const handleActiveConfiguration = (index: number) => {
    setActiveConfiguration(index);
  };

  return (
    <div className="grid grid-cols-2 grid-rows-1 gap-2 h-full">
      <div className="px-2 py-4 bg-surface">
        <h3 className="mb-10">Configuration</h3>
        <ConfigurationNav
          configurationList={configurationList}
          activeConfiguration={activeConfiguration}
          handleActiveConfiguration={handleActiveConfiguration}
        />
      </div>
      <div className="px-2 py-4 bg-surface">
        <div className={`h-full ${activeConfiguration !== 0 ? 'hidden' : ''}`}>
          <SubConfiguration
            title="Categories"
            btnTitle="Add Category"
            resource={categories}
            //dataFunction={getCategories}
            createAction={createCategory}
            editAction={editCategory}
            deleteAction={deleteCategory}
          />
        </div>
        <div className={`h-full ${activeConfiguration !== 1 ? 'hidden' : ''}`}>
          <SubConfiguration
            title="Payment Methods"
            btnTitle="Add Payment Method"
            resource={paymentMethods}
            //dataFunction={getPaymentMethods}
            createAction={createPaymentMethod}
            editAction={editPaymentMethod}
            deleteAction={deletePaymentMethod}
          />
        </div>
        <div className={`h-full ${activeConfiguration !== 2 ? 'hidden' : ''}`}>
          <SubConfiguration
            title="Groups"
            btnTitle="Add new group"
            resource={groups}
            //dataFunction={getGroups}
            createAction={createGroup}
            editAction={editGroup}
            deleteAction={deleteGroup}
          />
        </div>
        <div className={`h-full ${activeConfiguration !== 3 ? 'hidden' : ''}`}>
          <UserSettings userData={userData} />
        </div>
      </div>
    </div>
  );
};

export default MainConfiguration;
