import React from 'react';
import { View, Text, Image } from 'react-native';
import { CampaignDetailSheetProps } from '../../../types/components/campaignDetailSheet';
import { formatCurrency } from '../../../utils/formatting';
import { useStyles } from './styles';

const CampaignDetailSheet: React.FC<CampaignDetailSheetProps> = ({ campaign }) => {
  const styles = useStyles();

  if (!campaign) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No campaign selected</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: campaign.logo.cropped_location }} style={styles.logo} />
        <View style={styles.headerText}>
          <Text style={styles.title}>{campaign.name}</Text>
          <Text style={styles.subtitle}>{campaign.type}</Text>
        </View>
      </View>

      <Text style={styles.description}>{campaign.description}</Text>

      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Campaign Details</Text>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Equity Offered</Text>
          <Text style={styles.detailValue}>{campaign.equity_offered}%</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Tax Eligibility</Text>
          <Text style={styles.detailValue}>{campaign.tax_eligibility || 'N/A'}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>City and Country</Text>
          <Text style={styles.detailValue}>
            {campaign.address.city}, {campaign.address.country}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Total Investment Goal</Text>
          <Text style={styles.detailValue}>
            {formatCurrency(
              campaign.investment_sought.amount_in_cents,
              campaign.investment_sought.currency
            )}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CampaignDetailSheet;
