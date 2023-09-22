export const dynamicMenu = (editor: any) => {
  editor.ui.registry.addNestedMenuItem('usermenu', {
    text: 'User Data',
    getSubmenuItems: function () {
      return [
        {
          type: 'menuitem',
          text: 'Firstname',
          onAction: function () {
            editor.insertContent('<code>{{user.firstname}}</code>&nbsp;')
          },
        },
        {
          type: 'menuitem',
          text: 'Lastname',
          onAction: function () {
            editor.insertContent('<code>{{user.lastname}}</code>&nbsp;')
          },
        },
        {
          type: 'menuitem',
          text: 'Fullname',
          onAction: function () {
            editor.insertContent('<code>{{user.fullname}}</code>&nbsp;')
          },
        },
        {
          type: 'menuitem',
          text: 'Nationality',
          onAction: function () {
            editor.insertContent('<code>{{user.nationality}}</code>&nbsp;')
          },
        },
        {
          type: 'menuitem',
          text: 'Email',
          onAction: function () {
            editor.insertContent('<code>{{user.email}}</code>&nbsp;')
          },
        },
        {
          type: 'menuitem',
          text: 'Name in IC',
          onAction: function () {
            editor.insertContent('<code>{{user.name_in_ic}}</code>&nbsp;')
          },
        },
        {
          type: 'menuitem',
          text: 'IC Type',
          onAction: function () {
            editor.insertContent('<code>{{user.ic_type}}</code>&nbsp;')
          },
        },
        {
          type: 'menuitem',
          text: 'NRIC',
          onAction: function () {
            editor.insertContent('<code>{{user.nric}}</code>&nbsp;')
          },
        },
        {
          type: 'menuitem',
          text: 'IC Country',
          onAction: function () {
            editor.insertContent('<code>{{user.ic_country}}</code>&nbsp;')
          },
        },
        {
          type: 'menuitem',
          text: 'IC Option',
          onAction: function () {
            editor.insertContent('<code>{{user.ic_option}}</code>&nbsp;')
          },
        },
        {
          type: 'menuitem',
          text: 'Country',
          onAction: function () {
            editor.insertContent('<code>{{user.country}}</code>&nbsp;')
          },
        },
      ]
    },
  })

  editor.ui.registry.addNestedMenuItem('campaignmenu', {
    text: 'Campaign Data',
    getSubmenuItems: function () {
      return [
        {
          type: 'menuitem',
          text: 'Total Margin (%)',
          onAction: function () {
            editor.insertContent(
              '<code>{{campaign.total_margin_percent}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Target Margin SGD',
          onAction: function () {
            editor.insertContent(
              '<code>{{campaign.target_margin_sgd}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Target Margin IDR',
          onAction: function () {
            editor.insertContent(
              '<code>{{campaign.target_margin_idr}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Real Margin SGD',
          onAction: function () {
            editor.insertContent(
              '<code>{{campaign.real_margin_sgd}}</code>&nbsp;'
            )
          },
        },
      ]
    },
  })

  editor.ui.registry.addNestedMenuItem('masterpayoutmenu', {
    text: 'Master Payout Data',
    getSubmenuItems: function () {
      return [
        {
          type: 'menuitem',
          text: 'Table (EN)',
          onAction: function () {
            editor.insertContent('<code>{{masterpayout.table}}</code>&nbsp;')
          },
        },
        {
          type: 'menuitem',
          text: 'Table (ID)',
          onAction: function () {
            editor.insertContent('<code>{{masterpayout.table_id}}</code>&nbsp;')
          },
        },
        {
          type: 'menuitem',
          text: 'Payout Percentage 1',
          onAction: function () {
            editor.insertContent(
              '<code>{{masterpayout.percentage_1}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Payout Percentage 2',
          onAction: function () {
            editor.insertContent(
              '<code>{{masterpayout.percentage_2}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Payout Date 1 (EN)',
          onAction: function () {
            editor.insertContent('<code>{{masterpayout.date_1}}</code>&nbsp;')
          },
        },
        {
          type: 'menuitem',
          text: 'Payout Date 1 (ID)',
          onAction: function () {
            editor.insertContent(
              '<code>{{masterpayout.date_1_id}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Payout Date 2 (EN)',
          onAction: function () {
            editor.insertContent('<code>{{masterpayout.date_2}}</code>&nbsp;')
          },
        },
        {
          type: 'menuitem',
          text: 'Payout Date 2 (ID)',
          onAction: function () {
            editor.insertContent(
              '<code>{{masterpayout.date_2_id}}</code>&nbsp;'
            )
          },
        },
      ]
    },
  })

  editor.ui.registry.addNestedMenuItem('contractautomaticmenu', {
    text: 'Contract Data (Automatically Generated)',
    getSubmenuItems: function () {
      return [
        {
          type: 'menuitem',
          text: 'Target Funding Amount / Asset Cost',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.target_funding_amount}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Wakalah Fee (Kapital Boost)',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.wakalah_fee_kapital_boost}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Wakalah Fee (Investor)',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.wakalah_fee_investor}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Total Payout (SGD)',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.total_payout_sgd}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Date (ENG)',
          onAction: function () {
            editor.insertContent('<code>{{contract.date_eng}}</code>&nbsp;')
          },
        },
        {
          type: 'menuitem',
          text: 'Date (ID)',
          onAction: function () {
            editor.insertContent('<code>{{contract.date_id}}</code>&nbsp;')
          },
        },
        {
          type: 'menuitem',
          text: 'BG Table 1',
          onAction: function () {
            editor.insertContent('<code>{{contract.bg_table}}</code>&nbsp;')
          },
        },
        {
          type: 'menuitem',
          text: 'BG Table 2',
          onAction: function () {
            editor.insertContent('<code>{{contract.bg_table_2}}</code>&nbsp;')
          },
        },
        {
          type: 'menuitem',
          text: 'LPC',
          onAction: function () {
            editor.insertContent('<code>{{contract.LPC}}</code>&nbsp;')
          },
        },
        {
          type: 'menuitem',
          text: 'Campaign No',
          onAction: function () {
            editor.insertContent('<code>{{contract.campaign_no}}</code>&nbsp;')
          },
        },
        {
          type: 'menuitem',
          text: 'Campaign Acro',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.campaign_acronim}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Month in Roman',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.month_in_roman}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Admin fees (IDR)',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.admin_fee_idr}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Admin fees (SGD)',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.admin_fee_sgd}}</code>&nbsp;'
            )
          },
        },
      ]
    },
  })

  editor.ui.registry.addNestedMenuItem('contractgeneralmenu', {
    text: 'Contract Data (General)',
    getSubmenuItems: function () {
      return [
        {
          type: 'menuitem',
          text: 'Company Code',
          onAction: function () {
            editor.insertContent('<code>{{contract.company_code}}</code>&nbsp;')
          },
        },
        {
          type: 'menuitem',
          text: 'Company Name En',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.company_name_en}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Signee 1',
          onAction: function () {
            editor.insertContent('<code>{{contract.signee_1}}</code>&nbsp;')
          },
        },
        {
          type: 'menuitem',
          text: 'Signee 2',
          onAction: function () {
            editor.insertContent('<code>{{contract.signee_2}}</code>&nbsp;')
          },
        },
        {
          type: 'menuitem',
          text: 'Email 1',
          onAction: function () {
            editor.insertContent('<code>{{contract.email_1}}</code>&nbsp;')
          },
        },
        {
          type: 'menuitem',
          text: 'Email 2',
          onAction: function () {
            editor.insertContent('<code>{{contract.email_2}}</code>&nbsp;')
          },
        },
        {
          type: 'menuitem',
          text: 'ID Number 1',
          onAction: function () {
            editor.insertContent('<code>{{contract.id_number_1}}</code>&nbsp;')
          },
        },
        {
          type: 'menuitem',
          text: 'ID Number 2',
          onAction: function () {
            editor.insertContent('<code>{{contract.id_number_2}}</code>&nbsp;')
          },
        },
        {
          type: 'menuitem',
          text: 'Company Registration Number',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.company_registration_no_en}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Company Registration Number ID',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.company_registration_no_id}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Customer Name En',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.customer_name_en}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Customer Name ID',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.customer_name_id}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Alamat Perusahaan (Company Address)',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.transfer_info_en}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Transfer Info ID',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.transfer_info_ba}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Syarat 1',
          onAction: function () {
            editor.insertContent('<code>{{contract.other_en}}</code>&nbsp;')
          },
        },
        {
          type: 'menuitem',
          text: 'Other ID',
          onAction: function () {
            editor.insertContent('<code>{{contract.other_ba}}</code>&nbsp;')
          },
        },
        {
          type: 'menuitem',
          text: 'Exchange Rate',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.exchange_rate}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'UKM Phone Number',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.payment_method_en}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Syarat 2',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.payment_method_id}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Admin Fee Percentage',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.admin_fee_percentage}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Admin Fee IDR (Target)',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.admin_fee_amount_idr}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Admin Fee SGD (Target)',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.admin_fee_amount_sgd}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Agent Fee',
          onAction: function () {
            editor.insertContent('<code>{{contract.agent_fee}}</code>&nbsp;')
          },
        },
      ]
    },
  })

  editor.ui.registry.addNestedMenuItem('contractassetmenu', {
    text: 'Contract Data (Asset)',
    getSubmenuItems: function () {
      return [
        {
          type: 'menuitem',
          text: 'Asset to be purchased',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.asset_to_be_purchased}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Asset to be purchased ID',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.asset_to_be_purchased_id}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Campaign Country Currency',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.campaign_country_currency}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Variable Funding',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.asset_cost_in_campaign_country}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Purchase cost contribution date / Disbursement date',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.purchase_cost_contribution_date}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Investment (SGD)',
          onAction: function () {
            editor.insertContent('<code>{{investment.amount}}</code>&nbsp;')
          },
        },
        {
          type: 'menuitem',
          text: 'Investment (Rp.)',
          onAction: function () {
            editor.insertContent('<code>{{investment.amount_idr}}</code>&nbsp;')
          },
        },
        {
          type: 'menuitem',
          text: 'Agency Agreement No.',
          onAction: function () {
            editor.insertContent(
              '<code>{{investment.agency_agreement_no}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Return Amount',
          onAction: function () {
            editor.insertContent('<code>{{investment.payout}}</code>&nbsp;')
          },
        },
      ]
    },
  })

  editor.ui.registry.addNestedMenuItem('contractassetsgdmenu', {
    text: 'Contract Data (Asset, SGD)',
    getSubmenuItems: function () {
      return [
        {
          type: 'menuitem',
          text: 'Total Payout',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.asset_total_payout}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Investor Margin',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.asset_investor_margin}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Percentage Contribution',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.asset_percentage_contribution}}</code>&nbsp;'
            )
          },
        },
      ]
    },
  })

  editor.ui.registry.addNestedMenuItem('contractinvoicemenu', {
    text: 'Contract Data (Invoice Financing)',
    getSubmenuItems: function () {
      return [
        {
          type: 'menuitem',
          text: 'Maturity Date',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.maturity_date}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Repayment Date',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.repayment_date}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Receivable Amount as per invoice',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.receivable_amount_invoice}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'receivable amount in sgd',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.receivable_amount_sgd}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Sub-Agency Fee (%)',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.sub_agent_fee}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Sub-Agency Fee (Rp)',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.sub_agent_fee_idr}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Agency Fee (Rp)',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.agent_fee_idr}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Total Agency Fees (Rp)',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.total_agent_fee_idr}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'AKTA No',
          onAction: function () {
            editor.insertContent('<code>{{contract.akta_no}}</code>&nbsp;')
          },
        },
        {
          type: 'menuitem',
          text: 'AKTA No ID',
          onAction: function () {
            editor.insertContent('<code>{{contract.akta_no_id}}</code>&nbsp;')
          },
        },
        {
          type: 'menuitem',
          text: 'Underlying Document',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.underlying_document}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Underlying Document ID',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.underlying_document_id}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Sub Agent fee SGD',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.sub_agent_fee_sgd}}</code>&nbsp;'
            )
          },
        },
        {
          type: 'menuitem',
          text: 'Total Agent fee SGD',
          onAction: function () {
            editor.insertContent(
              '<code>{{contract.total_agent_fee_sgd}}</code>&nbsp;'
            )
          },
        },
      ]
    },
  })
}
