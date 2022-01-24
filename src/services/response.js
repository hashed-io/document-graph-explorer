export default {
  'took': 83,
  'timed_out': false,
  '_shards': {
    'total': 1,
    'successful': 1,
    'skipped': 0,
    'failed': 0
  },
  'hits': {
    'total': {
      'value': 4,
      'relation': 'eq'
    },
    'max_score': 2.2031476,
    'hits': [
      {
        '_index': 'traceability-documents',
        '_type': '_doc',
        '_id': '10',
        '_score': 2.2031476,
        '_source': {
          'contract': 'tlaclocmant2',
          'createdDate': '2022-01-18T16:35:27.5Z',
          'creator': 'tlaclocmant2',
          'details_arrivalDate_s': '4-10-2021',
          'details_city_s': 'Cusco',
          'details_deparatureDate_s': '4-8-2021',
          'details_sortPrioriry_i': 10,
          'details_sortPrioriry_i_s': '10',
          'docId': '10',
          'docId_i': 10,
          'fixedDetails_owner_n': 'tlaclocmant2',
          'fixedDetails_type_n': 'document',
          'system_nodeLabel_s': 'Lot transported to Cusco',
          'type': 'Transport',
          'updatedDate': '2022-01-18T16:35:27.5Z'
        }
      },
      {
        '_index': 'traceability-documents',
        '_type': '_doc',
        '_id': '7',
        '_score': 0.13353139,
        '_source': {
          'contract': 'tlaclocmant2',
          'createdDate': '2022-01-18T16:35:08Z',
          'creator': 'tlaclocmant2',
          'details_fermentationDateStart_s': '3-4-2021',
          'details_location_s': 'Cusco',
          'details_lotID_i': 243,
          'details_lotID_i_s': '243',
          'details_nodeLabel_s': 'Fermentation ended on 2-26-2021',
          'details_photo_s': '',
          'details_sortPriority_i': 6,
          'details_sortPriority_i_s': '6',
          'docId': '7',
          'docId_i': 7,
          'fixedDetails_owner_n': 'tlaclocmant2',
          'fixedDetails_type_n': 'document',
          'system_nodeLabel_s': 'Fermentation ended on 2-26-2021',
          'type': 'Fermentation',
          'updatedDate': '2022-01-18T16:35:08Z'
        }
      },
      {
        '_index': 'traceability-documents',
        '_type': '_doc',
        '_id': '6',
        '_score': 0.13353139,
        '_source': {
          'contract': 'tlaclocmant2',
          'createdDate': '2022-01-18T16:35:02.5Z',
          'creator': 'tlaclocmant2',
          'details_fermentationDateStart_s': '2-26-2021',
          'details_location_s': 'Cusco',
          'details_lotID_i': 243,
          'details_lotID_i_s': '243',
          'details_photo_s': 'ipfs://Qma35g4GgQLfLGQEnK3htsvz18crZyZkeFNT9MPsNwgzxs',
          'details_sortPriority_i': 6,
          'details_sortPriority_i_s': '6',
          'docId': '6',
          'docId_i': 6,
          'fixedDetails_owner_n': 'tlaclocmant2',
          'fixedDetails_type_n': 'document',
          'system_nodeLabel_s': 'Fermentation started on 2-26-2021',
          'type': 'Fermentation',
          'updatedDate': '2022-01-18T16:35:02.5Z'
        }
      },
      {
        '_index': 'traceability-documents',
        '_type': '_doc',
        '_id': '8',
        '_score': 0.13353139,
        '_source': {
          'contract': 'tlaclocmant2',
          'createdDate': '2022-01-18T16:35:13.5Z',
          'creator': 'tlaclocmant2',
          'details_closedOrOpenSpace_s': 'Closed',
          'details_fermentationDateEnd_s': '3-4-2021',
          'details_location_s': 'Cusco',
          'details_photo_s': 'ipfs://QmXivbgKjyA6TosX9KoNQVf9cJLR4brcis6wLg9bfnhyTZ',
          'details_sortPrioriry_i': 8,
          'details_sortPrioriry_i_s': '8',
          'docId': '8',
          'docId_i': 8,
          'fixedDetails_owner_n': 'tlaclocmant2',
          'fixedDetails_type_n': 'document',
          'system_nodeLabel_s': 'Dried for 10 days in closed space',
          'type': 'Dried',
          'updatedDate': '2022-01-18T16:35:13.5Z'
        }
      }
    ]
  }
}
