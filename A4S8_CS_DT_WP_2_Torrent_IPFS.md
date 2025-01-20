
# Torrent

```bash
C:\Users\MD>npm --version
10.9.2

npm install -g torrent

C:\Users\MD>torrent --version
2.0.0
```
### 1 : Create a torrent containing [this image](https://cdn.futura-sciences.com/sources/images/Chaton.jpeg).

```bash
torrent create Chaton.jpeg -o out.torrent

torrent info out.torrent > chat.json
```

> The torrent file has properly been created
### 2 : Now copy the image to a new directory named `partition1` and create a torrent of this folder. What do you observe?

```bash
mkdir partition1

cp Chaton.jpeg partition1.jpeg

torrent create partition1 -o out_partition.torrent

torrent info out_partition.torrent > partition1.json
```

```bash
diff out.json partition1.json
```

```
3,4c3,11
<     "length": 580873,
<     "name": "Chaton.jpeg",
---
>     "files": [
>       {
>         "length": 580873,
>         "path": [
>           "Chaton.jpeg"
>         ]
>       }
>     ],
>     "name": "partition1",
7,8c14,15
<   "infoHash": "c651f121b4108191f1e10c41f031ae02c58c7bc1",
<   "name": "Chaton.jpeg",
---
>   "infoHash": "5e41d90b1e0c8ed9f9c1abf64f242d685317fffe",
>   "name": "partition1",
50c57
<       "path": "Chaton.jpeg",
---
>       "path": "partition1\\Chaton.jpeg",
```

> As we can see, the new torrent files has serval modifications compared to the previous one.
> First of all, the description of the contained files has changed. In fact, the name and length of the file (in chat.json) has been replace by an array of dictionaries containing file path and file length (partition1.json), in the 'info' key of the dictionary. 
> Then, the torrent hash and name has been updated and the torrent name has also changed, from the file name, to the folder name.
> Finally, the path of the files in the torrent has also changed from "Chaton.jpeg" to ''partition1\\\\Chaton.jpeg"
### 3 : Copy the `partition1` folder and then generate the associated torrent. What do you observe?

```bash
cp partition1 partition2

torrent create partition2 -o out_partition2.torrent

torrent info out_partition2.torrent > partition2.json
```

```bash
diff partition1.json partition2.json
```

```
11c11
<     "name": "partition1",
---
>     "name": "partition2",
14,15c14,15
<   "infoHash": "5e41d90b1e0c8ed9f9c1abf64f242d685317fffe",
<   "name": "partition1",
---
>   "infoHash": "65e3cd9110890348696cf5bbdb83a27d4a492daa",
>   "name": "partition2",
57c57
<       "path": "partition1\\Chaton.jpeg",
---
>       "path": "partition2\\Chaton.jpeg",
```

> As we can see from this new differentiation of the two files, we have far less changed between the two torrent files.
> Simples information like the torrent name, the info hash and  path of the files (since we changed the folder name)
> In conclusion all new files and folders has an unique hash that is attributed to it, no matters if the file is duplicated or not in the system.
# IPFS

### 1 : Upload the previous [image](https://github.com/Gwen-M/workshop2/blob/main) to IPFS.

```bash
ipfs add Chaton.jpeg
```

```
PS C:\Users\MD\Documents\ipfs> ipfs add .\Chaton.jpeg
added QmeJaufp9seXCpHMFwxX53P3oRQW8Ny1DduCXAxebEwxv7 Chaton.jpeg
```
### 2 : Now upload `partition1` to IPFS. What do you observe compared to the torrent part?

```bash
mkdir partition1

cp .\Chaton.jpeg .\partition1\Chaton.jpeg

ipfs add -r .\partition1\
```

```
PS C:\Users\MD\Documents\ipfs> & "C:\Users\MD\Downloads\kubo_v0.32.1_windows-amd64\kubo\ipfs.exe" add -r .\partition1\
added QmeJaufp9seXCpHMFwxX53P3oRQW8Ny1DduCXAxebEwxv7 partition1/Chaton
added QmeJaufp9seXCpHMFwxX53P3oRQW8Ny1DduCXAxebEwxv7 partition1/Chaton.jpeg
added QmbhBdX2T5ctys93rxcpRzrqniCnagh7BU6zwf5XZMgzj3 partition1
```

> As we can see, the hash of the Chaton.jpeg file has not changed between the step 1 and the step 2 and is still QmeJaufp9seXCpHMFwxX53P3oRQW8Ny1DduCXAxebEwxv7. Yet, a new hash has been added for the partition 1 folder : QmbhBdX2T5ctys93rxcpRzrqniCnagh7BU6zwf5XZMgzj3
### 3 : Copy the `partition1` folder and then generate the associated torrent. What do you observe?

```bash
cp -r .\partition1\ .\partition2\

ipfs add -r .\partition2\
```

```
PS C:\Users\MD\Documents\ipfs> ipfs add -r .\partition2\
added QmeJaufp9seXCpHMFwxX53P3oRQW8Ny1DduCXAxebEwxv7 partition2/Chaton
added QmeJaufp9seXCpHMFwxX53P3oRQW8Ny1DduCXAxebEwxv7 partition2/Chaton.jpeg
added QmbhBdX2T5ctys93rxcpRzrqniCnagh7BU6zwf5XZMgzj3 partition2
```

> Similarly to the previous observation, the IPFS didn't created new IDs for the image nor the folder, this means that partition1 and partition2 are exactly the same element, indeed, they contain the exact same file. This behaviour is completely different from the torrent since it would have created a brand new hash for the copied, similar folder. 
>
> To confirm this IPFS behaviour, I decided to upload nested folder such that `partition3 > partition2 > Chaton.jpeg`. The predicted behaviour would keep the same ID for the Chaton.jpeg and partition2 but will create a new ID for the partition3. This is verified with : 

```
PS C:\Users\MD\Documents\ipfs> ipfs add -r .\partition3\
added QmeJaufp9seXCpHMFwxX53P3oRQW8Ny1DduCXAxebEwxv7 partition3/partition2/Chaton
added QmeJaufp9seXCpHMFwxX53P3oRQW8Ny1DduCXAxebEwxv7 partition3/partition2/Chaton.jpeg
added QmbhBdX2T5ctys93rxcpRzrqniCnagh7BU6zwf5XZMgzj3 partition3/partition2
added QmVV1Vzw8zujmzxoDHkK4JYcb6zfXfYtXbh13rnsmdPuw3 partition3
```