require('module-alias/register');
const BOBasePage = require('@pages/BO/BObasePage');

module.exports = class LinkWidgets extends BOBasePage {
  constructor(page) {
    super(page);

    this.pageTitle = 'Link Widget •';

    // Header Selectors
    this.newBlockLink = '#page-header-desc-configuration-add';
    this.gridPanel = '#link_widget_grid_%HOOKID_grid_panel';
    this.gridheaderTitle = `${this.gridPanel} h3.card-header-title`;
    this.gridTable = 'table#link_widget_grid_%HOOKID_grid_table';
    this.tableRow = `${this.gridTable} tbody tr`;
    this.tableColumn = `${this.tableRow} td.column-%COLUMN`;
    this.actionsColumn = `${this.tableRow} td.column-actions`;
    this.dropdownToggleButton = `${this.actionsColumn} a.dropdown-toggle`;
    this.dropdownToggleMenu = `${this.actionsColumn} div.dropdown-menu`;
    this.deleteRowLink = `${this.dropdownToggleMenu} a[data-url*='/delete']`;
  }

  /* Header methods */
  /**
   * Go to new Block page
   * @return {Promise<void>}
   */
  async goToNewLinkWidgetPage() {
    await this.clickAndWaitForNavigation(this.newBlockLink);
  }

  /* Table methods */
  /**
   * Get Number of element in grid
   * @param hookId, table to get number from
   * @return {Promise<integer>}
   */
  async getNumberOfElementInGrid(hookId) {
    return this.getNumberFromText(this.gridheaderTitle.replace('%HOOKID', hookId));
  }

  /**
   * Delete link widget
   * @param hookId, table to delete from
   * @param row, row to delete
   * @return {Promise<textContent>}
   */
  async deleteLinkWidget(hookId, row) {
    this.dialogListener(true);
    await Promise.all([
      this.page.click(this.dropdownToggleButton.replace('%HOOKID', hookId).replace('%ROW', row)),
      this.waitForVisibleSelector(
        `${this.dropdownToggleButton}[aria-expanded='true']`.replace('%HOOKID', hookId).replace('%ROW', row),
      ),
    ]);
    await this.clickAndWaitForNavigation(this.deleteRowLink.replace('%HOOKID', hookId).replace('%ROW', row));
    return this.getTextContent(this.alertSuccessBlockParagraph);
  }
};
