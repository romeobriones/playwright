class SrvOrdersEl {

    ordersAddBtn() { return '.pb-add-button' }
    ordersPanelTitle() { return '[class*="panel-title"]' }
    createOrderTitle() { return '//*[text()=" Create Order "]' }

    orderName() {  return '(//*[@id="name"])[1]'}

    country() { return '(//*[contains(@class, "pb-select")])[1]'}
    priceType() { return '(//*[contains(@class, "pb-select")])[2]'}

    category() { return '//*[text()="Category"]//following-sibling::select' }
    materialType() { return '//*[text()="Type"]//following-sibling::select' }
    infiniteAmount() { return '//*[text()=" Infinite Amount "]' }
    membersProfit() {  return '(//*[@id="name"])[3]'}
    branchProfit() { return '(//*[@id="name"])[6]' }

    bonusTab() { return '//*[@role="tab" and text()="Bonus"]' }
    bonusPageTitle() { return '//*[text()=" Bonus "]' }

    bonusAddBtn() { return '.pb-add-button' }
    bonusExportBtn() { return '//div[contains(@class, "export")]' }
    newBonusDetails() { return '//*[text()=" New Bonus details "]'}
    bonusTableHeader() { return '//thead//th' }
    orderBonusTableHeader() { return '//thead//th' }
    bonusName() {  return '(//*[@id="name"])[1]'}
    bonusCountry() { return '//*[@name="country"]' }
    bonusBrand() { return '//*[@id="brand"]' }
    bonusLimit() { return '//*[text()="Limit of Bonus"]//following-sibling::input' }
    totalWeight() { return '//*[text()="Total Weight (kg)"]//following-sibling::input' }
    dropDownOptions() { return '//*[contains(@class, "dropdown-container")]//li' }
    bonusMaterialType() { return '(//*[contains(@class, "pb-select")])[5]' }
    memberBonus() {  return '(//*[@id="name"])[4]'}
    branchBonus() { return '(//*[@id="name"])[6]' }
    assignProcessor() { return '//*[text()=" Assign Processor "]' }
    assignBranches() { return '//*[text()=" Assign Branches "]' }
    nameSearch() { return '//*[@placeholder="Name"]' }
    tableResults() { return '//*[@class="modal-content"]//tbody//tr' }
    processorModalTitle() { return '//*[contains(text(), "Recycle centers") and @class="modal-header"]' }
    branchesModalTitle() { return '//*[contains(text(), "Branches") and @class="modal-header"]' }
    confirmButton() { return '//*[text()="Confirm"]' }
    createBonusButton() { return '//*[text()="Create"]' }
    bonusOverviewTableResults() { return '//*[contains(@class, "table")]//tbody//tr' }
    branchToBranchBonus() { return '//*[text()="Branch to Branch bonus"]//following-sibling::select' }
    bonusInformationSave() { return '//*[text()="Save"]' }
    peopleImpactedColumnOrder() { return '//*[@placeholder="Tokens in Wallet"]/parent::div//div' }
    orderBonusExchangeHistoryTab() { return '//*[text()="Exchange History "]' }
    orderBonusExchangeHistoryTransactionData() { return '//transaction-item' }
    orderBonusExchangeHistoryExport() { return '//*[text()="Impact Claim Report"]' }
    bonusOrderNameTableFilter() { return '//*[@placeholder="Name"]' }
    orderBonusTableData() { return '//table//tbody//tr' }
}

module.exports = new SrvOrdersEl;
