account = Account.find_or_create_by!(name: "Buttwrap")
ActsAsTenant.default_tenant = account

Trigger.find_by!(name: "Main Curation").flow.update!(name: "Main Curation")
Trigger.find_by!(name: "Purchase Outro").flow.update!(name: "Purchase Outro")
Trigger.find_by!(name: "Adam EBW Chat").flow.update!(name: "Adam EBW Chat")
Trigger.find_by!(name: "Adam OBR Chat").flow.update!(name: "Adam OBR Chat")
Trigger.find_by!(name: "Adam BGM Chat").flow.update!(name: "Adam BGM Chat")
Trigger.find_by!(name: "James OBR Chat").flow.update!(name: "James OBR Chat")
Trigger.find_by!(name: "James BG Chat").flow.update!(name: "James BG Chat")
Trigger.find_by!(name: "James BGM Chat").flow.update!(name: "James BGM Chat")
Trigger.find_by!(name: "Oscar GBB Chat").flow.update!(name: "Oscar GBB Chat")
Trigger.find_by!(name: "Oscar EBW Chat").flow.update!(name: "Oscar EBW Chat")
Trigger.find_by!(name: "Oscar BW Chat").flow.update!(name: "Oscar BW Chat")
