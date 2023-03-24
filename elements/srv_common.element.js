class SrvCommonEl {
	
	usernameTextbox() { return '//*[@id="phone"]' }
	passwordTextbox() { return '//*[@id="password"]' }
	loginBtn() { return '.pb-button' }
	
	smsCode() { return '//*[@class="modal-content"]//input' }
	
	smsSubmit() { return '//*[text()="Submit"]' }
	
	//smsCode() { return '#smsCode' }
	modalSubmit() { return '.btn-submit' }
	avatar() { return '.pointer .circle-image.default-avatar' }
	apexChart() { return '[id*="apexchart"]' }
	apexMenu() { return '.apexcharts-toolbar > .apexcharts-menu-icon' }
	apexOptionDownloadCSV() { return '//*[@title="Download CSV"]' }
	apexChartXAxis() { return '//*[@class="apexcharts-xaxis-texts-g"]//*[contains(@id, "SvgjsText")]' }
	apexChartLegends() { return '//*[contains(@class, "apexcharts-legend apexcharts-align-center")]' }
	
	kgCollectedFirstFilterDropdown() { return '(//*[text()=" KG Collected "]/parent::div//select)[1]' }
	kgCollectedSecondFilterDropdown() { return '(//*[text()=" KG Collected "]/parent::div//select)[2]' }
	kgCollectedThirdFilterDropdown() { return '(//*[text()=" KG Collected "]/parent::div//select)[3]' }
	monthlySnapshotFirstFilterDropdown() { return '(//*[text()="Monthly Snapshot"]/parent::div/parent::div//pb-select)[1]//select' }
	monthlySnapshotSecondFilterDropdown() { return '(//*[text()="Monthly Snapshot"]/parent::div/parent::div//pb-select)[2]//select' }
	monthlySnapshotThirdFilterDropdown() { return '(//*[text()="Monthly Snapshot"]/parent::div/parent::div//pb-select)[3]//select' }
	monthlySnapshotFourthFilterDropdown() { return '(//*[text()="Monthly Snapshot"]/parent::div/parent::div//pb-select)[4]//select' }
	monthlySnapshotFifthFilterDropdown() { return '(//*[text()="Monthly Snapshot"]/parent::div/parent::div//pb-select)[5]//select' }
	monthlySnapshotSixthFilterDropdown() { return '(//*[text()="Monthly Snapshot"]/parent::div/parent::div//pb-select)[6]//select' }
	monthlySnapshotExportButton() { return '//*[text()="Monthly Snapshot"]//following-sibling::div[contains(@class, "export")]' }
	monthlySnapshotHeader() { return '//*[text()="Monthly Snapshot"]/parent::div/parent::div//*[contains(@class, "table-header")]//div[contains(@class, "col")]' }
	branchReportTitle() { return '//*[text()="Branch Report"]' }
	branchReportHeader() { return '//*[text()="Branch Report"]/parent::div/parent::div//*[contains(@class, "table-header")]//div[contains(@class, "col")]' }
	branchesTransactionHistoryHeader() { return '//*[text()="Branches Transaction History"]/parent::div/parent::div//*[contains(@class, "table-header")]/div' }
	tokenExchangeHistoryReportHeader() { return '//*[text()="Token Exchange History"]/parent::div/parent::div//thead/tr/th' }
	tokenExchangeHistoryDatePickerDay() { return '//*[text()="Token Exchange History"]/parent::div/parent::div//ngb-datepicker-month' }
	tokenExchangeHistoryDateFilter() { return '(//*[text()="Token Exchange History"]/parent::div/parent::div//*[@class="daterange-container"]/span)[1]' }
	processorReportTitle() { return '//*[text()="Processor Report"]' }
	processorReportHeader() { return '//*[text()="Processor Report"]/parent::div/parent::div//*[contains(@class, "table-header")]/div' }
	branchReportRowData() { return '//*[text()="Branch Report"]/parent::div/parent::div//*[contains(@class, "table-content")]//*[contains(@class, "row")]' }
	branchDashboardDateFilter() { return '//*[text()="Branch Report"]/parent::div/following-sibling::div//*[text()="Date range"]/parent::div/following-sibling::div/datepicker-range' }
	branchDashboardDatePickerDay() { return '//*[text()="Branch Report"]/parent::div/following-sibling::div//*[text()="Date range"]/parent::div/following-sibling::div//ngb-datepicker-month' }
	branchDashboardDatePickerMonth() { return '(//*[text()="Branch Report"]/parent::div/following-sibling::div//*[text()="Date range"]/parent::div/following-sibling::div//*[@class="ngb-dp-header"]//select)[1]' }
	branchDashboardDatePickerYear() { return '(//*[text()="Branch Report"]/parent::div/following-sibling::div//*[text()="Date range"]/parent::div/following-sibling::div//*[@class="ngb-dp-header"]//select)[2]' }
	branchesTransactionHistoryDatePickerDay() { return '//*[text()="Branches Transaction History"]/parent::div/parent::div//ngb-datepicker-month' }
	branchesTransactionHistoryDatePickerMonth() { return '(//*[text()="Branches Transaction History"]/parent::div/parent::div//*[@class="ngb-dp-header"]//select)[1]' }
	branchesTransactionHistoryDatePickerYear() { return '(//*[text()="Branches Transaction History"]/parent::div/parent::div//*[@class="ngb-dp-header"]//select)[2]' }
	branchesTransactionHistoryDateFilter() { return '(//*[text()="Branches Transaction History"]/parent::div/following-sibling::div[contains(@class, "row")]//datepicker-range/div/span)[1]' }
	branchesTransactionHistoryRowData() { return '//*[text()="Branches Transaction History"]/parent::div/parent::div//*[contains(@class, "table-content")]//*[contains(@class, "row")]' }
	processorReportRowData() { return '//*[text()="Processor Report"]/parent::div/parent::div//*[contains(@class, "table-content")]//*[contains(@class, "row")]' }
	branchReportExportButton() { return '(//*[text()=" EXPORT "])[2]' }
	branchesTransactionHistoryExportButton() { return '(//*[text()=" EXPORT "])[5]' }
	processorReportExportButton() { return '(//*[text()=" EXPORT "])[3]' }
	tokenExchangeHistoryReportExportButton() { return '(//*[text()=" EXPORT "])[4]' }
	BranchReportFirstFilter() { return '(//*[text()="Branch Report"]/parent::div/parent::div//pb-select)[1]//select' }
	BranchReportSecondFilter() { return '(//*[text()="Branch Report"]/parent::div/parent::div//pb-select)[2]//select' }
	BranchReportStartDate() { return '(//*[text()="Branch Report"]/parent::div//parent::div//*[@class="daterange-container"]//*[contains(@class, "pointer")])[1]' }
	BranchReportEndDate() { return '(//*[text()="Branch Report"]/parent::div//parent::div//*[@class="daterange-container"]//*[contains(@class, "pointer")])[2]' }
	logoutLink() { return '.icon.logout' }
	
	menuHamburger() { return '[class*="menu-toggle"]' }
	
	menuMembers() { return '.sidebar-icon.members' }
	menuBranches() { return '.sidebar-icon.cp' }
	menuProcessors() { return '.sidebar-icon.rcs' }
	menuStores() { return '.sidebar-icon.sps' }
	menuUsers() { return '.sidebar-icon.users' }
	menuOrders() { return '.sidebar-icon.orders' }
	loader() { return '//*[text()="Loading..." ]' }
}

module.exports = new SrvCommonEl;
