<template>
    <div class="wrap-table100">
        <div class="top-table">
            <div class="search-table">
                <input placeholder="Nhập từ bạn muốn tìm kiếm"/>
                <i class="fa-solid fa-magnifying-glass"></i>
            </div>
            <div class="btn-insert">
                <span>Thêm mới</span>
            </div>
        </div>
        <div class="table">
            <div class="row header">
                <div class="cell">
                    Full Name
                </div>
                <div class="cell">
                    Age
                </div>
                <div class="cell">
                    Job Title
                </div>
                <div class="cell">
                    Location
                </div>
                <div class="cell">
                    Button
                </div>
            </div>
            <div class="row">
                <div class="cell" data-title="Full Name">
                    Vincent Williamson
                </div>
                <div class="cell" data-title="Age">
                    31
                </div>
                <div class="cell" data-title="Job Title">
                    iOS Developer
                </div>
                <div class="cell" data-title="Location">
                    Washington
                </div>
                <div class="cell btn-row" data-title="Location">
                    <div class="btn-delete" title="Xóa">
                        <i class="fa-solid fa-trash"></i>   
                    </div>
                    <div class="btn-edit" title="Chỉnh sửa"> 
                        <i class="fa-solid fa-pen-to-square"></i>  
                    </div>
                    
                </div>
            </div>
            <div class="row">
                <div class="cell" data-title="Full Name">
                    Joseph Smith
                </div>
                <div class="cell" data-title="Age">
                    27
                </div>
                <div class="cell" data-title="Job Title">
                    Project Manager
                </div>
                <div class="cell" data-title="Location">
                    Somerville, MA
                </div>
            </div>
            <div class="row">
                <div class="cell" data-title="Full Name">
                    Justin Black
                </div>
                <div class="cell" data-title="Age">
                    26
                </div>
                <div class="cell" data-title="Job Title">
                    Front-End Developer
                </div>
                <div class="cell" data-title="Location">
                    Los Angeles
                </div>
            </div>
            <div class="row">
                <div class="cell" data-title="Full Name">
                    Sean Guzman
                </div>
                <div class="cell" data-title="Age">
                    25
                </div>
                <div class="cell" data-title="Job Title">
                    Web Designer
                </div>
                <div class="cell" data-title="Location">
                    San Francisco
                </div>
            </div>
            <div class="row">
                <div class="cell" data-title="Full Name">
                    Keith Carter
                </div>
                <div class="cell" data-title="Age">
                    20
                </div>
                <div class="cell" data-title="Job Title">
                    Graphic Designer
                </div>
                <div class="cell" data-title="Location">
                    New York, NY
                </div>
            </div>
            <div class="row">
                <div class="cell" data-title="Full Name">
                    Austin Medina
                </div>
                <div class="cell" data-title="Age">
                    32
                </div>
                <div class="cell" data-title="Job Title">
                    Photographer
                </div>
                <div class="cell" data-title="Location">
                    New York
                </div>
            </div>
            <div class="row">
                <div class="cell" data-title="Full Name">
                    Vincent Williamson
                </div>
                <div class="cell" data-title="Age">
                    31
                </div>
                <div class="cell" data-title="Job Title">
                    iOS Developer
                </div>
                <div class="cell" data-title="Location">
                    Washington
                </div>
            </div>
            <div class="row">
                <div class="cell" data-title="Full Name">
                    Joseph Smith
                </div>
                <div class="cell" data-title="Age">
                    27
                </div>
                <div class="cell" data-title="Job Title">
                    Project Manager
                </div>
                <div class="cell" data-title="Location">
                    Somerville, MA
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
a {
    margin: 0;
    transition: all .4s;
    -webkit-transition: all .4s;
    -o-transition: all .4s;
    -moz-transition: all .4s
}

a:focus {
    outline: none !important
}

a:hover {
    text-decoration: none
}

h1,
h2,
h3,
h4,
h5,
h6 {
    margin: 0
}

p {
    margin: 0
}

ul,
li {
    margin: 0;
    list-style-type: none
}

input {
    display: block;
    outline: none;
    border: none !important
}

textarea {
    display: block;
    outline: none
}

textarea:focus,
input:focus {
    border-color: transparent !important
}

button {
    outline: none !important;
    border: none;
    background: 0 0
}

button:hover {
    cursor: pointer
}

iframe {
    border: none !important
}

.limiter {
    width: 100%;
    margin: 0 auto
}

.container-table100 {
    /* width: 100%; */
    min-height: 100vh;
    background: #c4d3f6;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding: 33px 30px
}

.wrap-table100 {
    /* width:960px; */
    border-radius: 10px;
    overflow: hidden
}

.table {
    width: 90%;
    display: table;
    margin: auto;
    margin-top: 64px;
}
.top-table{
    display: flex;
    margin-top: 64px;
    float: right;
    margin-right: 96px;
    height: 32px;
    width: 420px;
    display: flex;
    justify-content: space-between;
}
.top-table input{
    height: 32px;
    width: 240px;
    border-radius: 4px;
}
.top-table .search-table{
    position: relative;
    
}
.top-table .search-table i {
    position: absolute;
    top: 8px;
    right: 8px;
    color: #000;
}
.top-table .btn-insert{
    height: 32px;
    width: 80px;
    background-color: aquamarine;
    align-items: center;
    display: flex;
    justify-content: center;
    border-radius: 4px;
    color: #000;
}
@media screen and (max-width: 768px) {
    .table {
        display: block
    }
}

.row {
    display: table-row;
    background: #fff
}

.row.header {
    color: #fff;
    background: #6c7ae0
}

@media screen and (max-width: 768px) {
    .row {
        display: block
    }

    .row.header {
        padding: 0;
        height: 0
    }

    .row.header .cell {
        display: none
    }

    .row .cell:before {
        font-family: Poppins-Bold;
        font-size: 12px;
        color: gray;
        line-height: 1.2;
        text-transform: uppercase;
        font-weight: unset !important;
        margin-bottom: 13px;
        content: attr(data-title);
        min-width: 98px;
        display: block
    }
}

.cell {
    display: table-cell
}

@media screen and (max-width: 768px) {
    .cell {
        display: block
    }
}

.row .cell {
    font-family: Poppins-Regular;
    font-size: 15px;
    color: #666;
    line-height: 1.2;
    font-weight: unset !important;
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f2f2f2
}

.row.header .cell {
    font-family: Poppins-Regular;
    font-size: 18px;
    color: #fff;
    line-height: 1.2;
    font-weight: unset !important;
    padding-top: 9px;
    padding-bottom: 9px;
}

.row .cell:nth-child(1) {
    width: 360px;
    padding-left: 40px
}

.row .cell:nth-child(2) {
    width: 160px
}

.row .cell:nth-child(3) {
    width: 250px
}

.row .cell:nth-child(4) {
    width: 190px
}

.table,
.row {
}

.row:hover {
    background-color: #ececff;
    cursor: pointer
}

@media(max-width: 768px) {
    .row {
        border-bottom: 1px solid #f2f2f2;
        padding-bottom: 18px;
        padding-top: 30px;
        padding-right: 15px;
        margin: 0
    }

    .row .cell {
        border: none;
        padding-left: 30px;
        padding-top: 16px;
        padding-bottom: 16px
    }

    .row .cell:nth-child(1) {
        padding-left: 30px
    }

    .row .cell {
        font-family: Poppins-Regular;
        font-size: 18px;
        color: #555;
        line-height: 1.2;
        font-weight: unset !important
    }

    .table,
    .row,
    .cell {
    }
}
.btn-row{
    display: flex;
    justify-content: space-around;
}
.btn-row .btn-delete:hover{
    color: red;
}
.btn-row .btn-edit:hover {
    color: aqua;
}
</style>