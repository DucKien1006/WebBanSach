<template>
    <div class="table-user">
        <div class="titel-table">
            Quản lý người dùng
        </div>
        <DxDataGrid id="gridContainer"  class="gridContainer" :data-source="dataSource" :allow-column-reordering="true" :show-borders="true"
            key-expr="ID" @editing-start="logEvent('EditingStart')" @init-new-row="logEvent('InitNewRow')"
            @row-inserting="logEvent('RowInserting')" @row-inserted="logEvent('RowInserted')"
            @row-updating="logEvent('RowUpdating')" @row-updated="logEvent('RowUpdated')"
            @row-removing="logEvent('RowRemoving')" @row-removed="logEvent('RowRemoved')" @saving="logEvent('Saving')"
            @saved="logEvent('Saved')" @edit-canceling="logEvent('EditCanceling')"
            @edit-canceled="logEvent('EditCanceled')">

            <DxPaging :enabled="true" />
            <DxEditing :allow-updating="true" :allow-deleting="true" :allow-adding="true" mode="row" > Chỉnh sửa</DxEditing>

            <DxColumn data-field="Prefix" caption="Title" />
            <DxColumn data-field="FirstName" />
            <DxColumn data-field="LastName" />
            <DxColumn :width="130" data-field="Position" />
            
            <DxColumn :width="125" data-field="BirthDate" data-type="date" />
        </DxDataGrid>

        
    </div>
</template>
<script>
import DxButton from 'devextreme-vue/button';
import {
    DxDataGrid, DxColumn, DxEditing, DxPaging, DxLookup,
} from 'devextreme-vue/data-grid';

export default {
    components: {
        DxDataGrid,
        DxColumn,
        DxEditing,
        DxPaging,
        DxButton,
        DxLookup,
    },
    data() {
        return {
            events: [],
            dataSource: [{
                ID: 1,
                FirstName: 'John',
                LastName: 'Heart',
                Prefix: 'Mr.',
                Position: 'CEO',
                BirthDate: '1964/03/16',
                HireDate: '1995/01/15',
                Notes: 'John has been in the Audio/Video industry since 1990. He has led DevAv as its CEO since 2003.\r\n\r\nWhen not working hard as the CEO, John loves to golf and bowl. He once bowled a perfect game of 300.',
                Address: '351 S Hill St.',
                StateID: 5,
            }, {
                ID: 2,
                FirstName: 'Olivia',
                LastName: 'Peyton',
                Prefix: 'Mrs.',
                Position: 'Sales Assistant',
                BirthDate: '1981/06/03',
                HireDate: '2012/05/14',
                Notes: 'Olivia loves to sell. She has been selling DevAV products since 2012. \r\n\r\nOlivia was homecoming queen in high school. She is expecting her first child in 6 months. Good Luck Olivia.',
                Address: '807 W Paseo Del Mar',
                StateID: 5,
            }, {
                ID: 3,
                FirstName: 'Robert',
                LastName: 'Reagan',
                Prefix: 'Mr.',
                Position: 'CMO',
                BirthDate: '1974/09/07',
                HireDate: '2002/11/08',
                Notes: 'Robert was recently voted the CMO of the year by CMO Magazine. He is a proud member of the DevAV Management Team.\r\n\r\nRobert is a championship BBQ chef, so when you get the chance ask him for his secret recipe.',
                Address: '4 Westmoreland Pl.',
                StateID: 4,
            }, {
                ID: 4,
                FirstName: 'Greta',
                LastName: 'Sims',
                Prefix: 'Ms.',
                Position: 'HR Manager',
                BirthDate: '1977/11/22',
                HireDate: '1998/04/23',
                Notes: "Greta has been DevAV's HR Manager since 2003. She joined DevAV from Sonee Corp.\r\n\r\nGreta is currently training for the NYC marathon. Her best marathon time is 4 hours. Go Greta.",
                Address: '1700 S Grandview Dr.',
                StateID: 11,
            }, {
                ID: 5,
                FirstName: 'Brett',
                LastName: 'Wade',
                Prefix: 'Mr.',
                Position: 'IT Manager',
                BirthDate: '1968/12/01',
                HireDate: '2009/03/06',
                Notes: 'Brett came to DevAv from Microsoft and has led our IT department since 2012.\r\n\r\nWhen he is not working hard for DevAV, he coaches Little League (he was a high school pitcher).',
                Address: '1120 Old Mill Rd.',
                StateID: 13,
            }, {
                ID: 6,
                FirstName: 'Sandra',
                LastName: 'Johnson',
                Prefix: 'Mrs.',
                Position: 'Controller',
                BirthDate: '1974/11/15',
                HireDate: '2005/05/11',
                Notes: "Sandra is a CPA and has been our controller since 2008. She loves to interact with staff so if you've not met her, be certain to say hi.\r\n\r\nSandra has 2 daughters both of whom are accomplished gymnasts.",
                Address: '4600 N Virginia Rd.',
                StateID: 44,
            }, {
                ID: 7,
                FirstName: 'Kevin',
                LastName: 'Carter',
                Prefix: 'Mr.',
                Position: 'Shipping Manager',
                BirthDate: '1978/01/09',
                HireDate: '2009/08/11',
                Notes: 'Kevin is our hard-working shipping manager and has been helping that department work like clockwork for 18 months.\r\n\r\nWhen not in the office, he is usually on the basketball court playing pick-up games.',
                Address: '424 N Main St.',
                StateID: 5,
            }, {
                ID: 8,
                FirstName: 'Cynthia',
                LastName: 'Stanwick',
                Prefix: 'Ms.',
                Position: 'HR Assistant',
                BirthDate: '1985/06/05',
                HireDate: '2008/03/24',
                Notes: 'Cindy joined us in 2008 and has been in the HR department for 2 years. \r\n\r\nShe was recently awarded employee of the month. Way to go Cindy!',
                Address: '2211 Bonita Dr.',
                StateID: 4,
            }, {
                ID: 9,
                FirstName: 'Kent',
                LastName: 'Samuelson',
                Prefix: 'Dr.',
                Position: 'Ombudsman',
                BirthDate: '1972/09/11',
                HireDate: '2009/04/22',
                Notes: 'As our ombudsman, Kent is on the front-lines solving customer problems and helping our partners address issues out in the field.    He is a classically trained musician and is a member of the Chamber Orchestra.',
                Address: '12100 Mora Dr',
                StateID: 26,
            }, {
                ID: 10,
                FirstName: 'Taylor',
                LastName: 'Riley',
                Prefix: 'Mr.',
                Position: 'Network Admin',
                BirthDate: '1982/08/14',
                HireDate: '2012/04/14',
                Notes: "If you are like the rest of us at DevAV, then you've probably reached out for help from Taylor. He does a great job as a member of our IT department.",
                Address: '7776 Torreyson Dr',
                StateID: 5,
            }, ],
      }
    },
    methods: {
        logEvent(eventName) {
            this.events.unshift(eventName);
        },
        clearEvents() {
            this.events = [];
        },
    },
};
</script>
<style>
#events {
    background-color: rgba(191, 191, 191, 0.15);
    padding: 20px;
    margin-top: 20px;
}

#events>div {
    padding-bottom: 5px;
}

#events>div::after {
    content: "";
    display: table;
    clear: both;
}

#events #clear {
    float: right;
}

#events .caption {
    float: left;
    font-weight: bold;
    font-size: 115%;
    line-height: 115%;
    padding-top: 7px;
}

#events ul {
    list-style: none;
    max-height: 100px;
    overflow: auto;
    margin: 0;
}

#events ul li {
    padding: 7px 0;
    border-bottom: 1px solid #ddd;
}

#events ul li:last-child {
    border-bottom: none;
}
.table-user{
    background-color: #fff;
    color: #000;
    width: 90%;
    margin: auto;
    height: 360px;
    border-radius: 4px;
}
.table-user td{
    min-width: 120px;
}
.table-user input{
    width: 110px;
}
.gridContainer{
    overflow-y: scroll;
}
</style>
  