---
description: Choose the correct upgrade, migration, or downgrade path based on the current version.
icon: arrow-right-arrow-left
---
# Version Upgrade and Downgrade

When switching between V1 and V2, please select the corresponding guide:

* [Feature Differences](../cherry-studio/installation/v1-v2-feature-differences.md)
* [Upgrading from V1 to V2](../cherry-studio/installation/v1-to-v2-migration.md)
* [Downgrading from V2 to V1](../cherry-studio/installation/v2-to-v1-downgrade.md)

{% hint style="danger" %}
Before switching versions, create a complete backup within the app, then fully exit Cherry Studio and copy the entire data directory. Backups from V1 and V2 cannot be restored to each other.
{% endhint %}

## Migrating V1 Data to V2

V2 supports direct migration from V1.9.13; no intermediate V2 release is required.

| Current Situation | Recommended Action |
| --------------- | ---------------------------------- |
| Still on V1, need to retain data | Update V1 to 1.9.13, then directly install V2 to complete the migration. |
| Already using V2 | Upgrade to V2 normally and continue using current V2 data. |
| Previous V1 migration failed or data was missed | Only use [Re-migrate] after fully backing up current V2 data. |
| Do not need V1 data | You can select [Ignore and Use Defaults], but V1 data will not be migrated. |

{% hint style="danger" %}
[Re-migrate] in [Settings] → [Data] permanently deletes current V2 data and re-imports from the original V1 data. It does not merge data from both sides; do not click it unless V1 migration failed or data was missed.
{% endhint %}

## Download Links

* [V1 Official Download](https://cherryai.com.cn/download/v1)
* V2 Release Page: [GitCode](https://gitcode.com/CherryHQ/cherry-studio/releases) · [GitHub](https://github.com/CherryHQ/cherry-studio/releases)
* [V2 Official Download](https://cherryai.com.cn/download)

For more information on backups, migration failures, and database considerations, see [Upgrade and Downgrade](../cherry-studio/installation/upgrade-downgrade.md).
