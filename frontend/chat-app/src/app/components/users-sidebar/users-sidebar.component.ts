import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-users-sidebar',
  templateUrl: './users-sidebar.component.html',
  styleUrls: ['./users-sidebar.component.scss'],
})
export class UsersSidebarComponent implements OnInit {
  chatList: any;
  selectedUserChat: any | null = null;

  tempData = [
    {
      _id: '6586c9943734fe594ba1abbb',
      chatName: 'sender',
      isGroupChat: 'false',
      users: [
        {
          _id: '65866e2dd418f70bffd87b8b',
          name: 'ankit2',
          email: 'ankit2@gmail.com',
          pic: 'http://res.cloudinary.com/dsqteibj6/image/upload/v1703308844/juv9vvaeqog9iwmnjy8n.jpg',
          createdAt: '2023-12-23T05:20:45.162Z',
          updatedAt: '2023-12-23T05:20:45.162Z',
          __v: 0,
        },
        {
          _id: '658452e7a53498d08e928df8',
          name: 'ankit1',
          email: 'ankit1@gmail.com',
          pic: 'http://res.cloudinary.com/dsqteibj6/image/upload/v1703308844/juv9vvaeqog9iwmnjy8n.jpg',
          createdAt: '2023-12-21T14:59:51.740Z',
          updatedAt: '2023-12-21T14:59:51.740Z',
          __v: 0,
        },
      ],
      __v: 0,
      latestMessage: {
        _id: '6589bffa7c7d19b18759492a',
        sender: {
          _id: '658452e7a53498d08e928df8',
          name: 'ankit1',
          email: 'ankit1@gmail.com',
          pic: 'http://res.cloudinary.com/dsqteibj6/image/upload/v1703308844/juv9vvaeqog9iwmnjy8n.jpg',
        },
        content: 'How are you',
        chat: '6586c9943734fe594ba1abbb',
        __v: 0,
      },
    },
    {
      _id: '65880446b79836533245db5c',
      chatName: 'Demo grp 1',
      isGroupChat: 'true',
      users: [
        {
          _id: '65866e2dd418f70bffd87b8b',
          name: 'ankit2',
          email: 'ankit2@gmail.com',
          pic: 'http://res.cloudinary.com/dsqteibj6/image/upload/v1703308844/juv9vvaeqog9iwmnjy8n.jpg',
          createdAt: '2023-12-23T05:20:45.162Z',
          updatedAt: '2023-12-23T05:20:45.162Z',
          __v: 0,
        },
        {
          _id: '658452e7a53498d08e928df8',
          name: 'ankit1',
          email: 'ankit1@gmail.com',
          pic: 'http://res.cloudinary.com/dsqteibj6/image/upload/v1703308844/juv9vvaeqog9iwmnjy8n.jpg',
          createdAt: '2023-12-21T14:59:51.740Z',
          updatedAt: '2023-12-21T14:59:51.740Z',
          __v: 0,
        },
        {
          _id: '658452e7a53498d08e928df8',
          name: 'ankit1',
          email: 'ankit1@gmail.com',
          pic: 'http://res.cloudinary.com/dsqteibj6/image/upload/v1703308844/juv9vvaeqog9iwmnjy8n.jpg',
          createdAt: '2023-12-21T14:59:51.740Z',
          updatedAt: '2023-12-21T14:59:51.740Z',
          __v: 0,
        },
      ],
      groupAdmin: {
        _id: '658452e7a53498d08e928df8',
        name: 'ankit1',
        email: 'ankit1@gmail.com',
        pic: 'http://res.cloudinary.com/dsqteibj6/image/upload/v1703308844/juv9vvaeqog9iwmnjy8n.jpg',
        createdAt: '2023-12-21T14:59:51.740Z',
        updatedAt: '2023-12-21T14:59:51.740Z',
        __v: 0,
      },
      __v: 0,
    },
    {
      _id: '65880599b39a4c3d4d0f2b0a',
      chatName: 'Test Group2',
      isGroupChat: 'true',
      users: [
        {
          _id: '65866e2dd418f70bffd87b8b',
          name: 'ankit2',
          email: 'ankit2@gmail.com',
          pic: 'http://res.cloudinary.com/dsqteibj6/image/upload/v1703308844/juv9vvaeqog9iwmnjy8n.jpg',
          createdAt: '2023-12-23T05:20:45.162Z',
          updatedAt: '2023-12-23T05:20:45.162Z',
          __v: 0,
        },
        {
          _id: '658452e7a53498d08e928df8',
          name: 'ankit1',
          email: 'ankit1@gmail.com',
          pic: 'http://res.cloudinary.com/dsqteibj6/image/upload/v1703308844/juv9vvaeqog9iwmnjy8n.jpg',
          createdAt: '2023-12-21T14:59:51.740Z',
          updatedAt: '2023-12-21T14:59:51.740Z',
          __v: 0,
        },
      ],
      groupAdmin: {
        _id: '658452e7a53498d08e928df8',
        name: 'ankit1',
        email: 'ankit1@gmail.com',
        pic: 'http://res.cloudinary.com/dsqteibj6/image/upload/v1703308844/juv9vvaeqog9iwmnjy8n.jpg',
        createdAt: '2023-12-21T14:59:51.740Z',
        updatedAt: '2023-12-21T14:59:51.740Z',
        __v: 0,
      },
      __v: 0,
    },
    {
      _id: '6588062dcc67018442c5d186',
      chatName: 'Test Group2',
      isGroupChat: 'true',
      users: [
        {
          _id: '658452e7a53498d08e928df8',
          name: 'ankit1',
          email: 'ankit1@gmail.com',
          pic: 'http://res.cloudinary.com/dsqteibj6/image/upload/v1703308844/juv9vvaeqog9iwmnjy8n.jpg',
          createdAt: '2023-12-21T14:59:51.740Z',
          updatedAt: '2023-12-21T14:59:51.740Z',
          __v: 0,
        },
        {
          _id: '65880749930fc75738678bc9',
          name: 'Nipun1',
          email: 'Nipun1@gmail.com',
          pic: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ0AAACUCAMAAAC+99ssAAAAZlBMVEX///9UWV1MUlaBhIdPVFh3e33x8vLb3NxJT1NDSU74+PhGTFFRVlv19fX8/Pw+REmkpqjKy8xZXmLU1daLjpDp6epxdXhrb3K+v8A3PkNgZGji4+Nmam6trrCanJ6SlZe1t7gtNTtM61vlAAAEaUlEQVR4nO2bi3ajIBBAI6Ki4AvfGh/7/z+5Md22addEBEa6e7hfcA86zDAMl4vF8u+SRFW+ZNM8T2Nb+FFi2ueBIc/qtEtDSm7QMO2QO+a+aas3WrenBDtfQJQ0ZWHa7BJkaYiZswFDHV4qk27V5IRbZu+CYTMac4vHFG0u24Mf4bmZCCnqV+v24ZfOBuIjWRgSkLtB+tPDIy5TMbf78i3nfl3fpcJy6/JNZ8pVDjki5zhpGZ0m59cH5W6rN/9gudvqnfVxS5Gd5C9oe4rcciggPmAkOEGuIDv54RmYnxAZPd4X2YZk4HKZ3Hd904NOGgOX/K4rqAG2KxWWznG6HFSu6lTkHFyDBsYssQ8/QiAXr+oV/rq7XQlYrbRKf91KCFeKJq5gwfnCDu6gEUsl2C/gGsyuFa+HnwN2iCwVI3YFg5UqqhG7ApZsK64u5yCoPaXQIHcLC6A9pZWunR5gHCgsRuXdboUOMHaZhpC9HX9+th3Q8cLa/a92oxa7ECgqFi07CgPa73INadZhV6BcMWiQc7Abw9glKmfZd+AajbWGRIsWKLtRvXJ3HLBO1KB21l5hPZTcJVIvjkkJZncZlc+zHWCLUbk6xlfIRoqnGLV0AZS75GpxwXrYK1H5vux96YB7s7lSXFDgvrZSowewxfOHSr7Iwx78lcAo3eqBqoofiWS/LT1lRqDiUnFL3HOukAMqkW5RA1R1/kV+/Nsi4H34kfZoysD8jAvGD73t+Z1nEKjG0xOK9EBokAboDPuUqhbNaQyy4nyGP3VCy0fIOVfu3yma/a0FI9fUIF6U8fClH0sb2DvP1/gZ/j4Y+KmGCM/P2oKfEC0uDjcEUcpnk+v2TjSMza+UIszewJiEXefmZ+8iLwiW2fXq5to0tedOrdGJym0iv7rh/6RpXovF8s+SxHd+yo6SxH4V5EtWetd17v4TzBt3ztp8qPzzplG/mAVtNrtXkq4PF/D3Qp5htD5lSFnjTuO5OS2Jg8zrOb6t0W59dytUCOO9u1SnLGJSLC7p6LFTD8Nhx+cWeg2rqXaoXKeCEdrXC1yhPCy8kx1JfRNkYeflIPVLUO6U6WKg8Jrp9ouKPtx76SEKQ2mptTOQe1vFuTyEzNoiZPCQlnvjL35s1pJT/KzT7rZC+aIuV/RapgE2YMRVDI94SjXFwhYkVDpTVp7ytd1LGJ3k/74cg/xxj9BetluQU63byDayvb1Fpnl9HIxk9A73hqX1JEYFJPrq0nr8aOVS6Mj4oqCDepL3ObIcG86P6/O+651Dr80yHWMxx/TEI2PQMc9+DPEx5Eh1ckIG4Xtv9TceUnpii5ccOw3qQvBGSMsrCgm4SEZLrkaWTnBYJTcQEncYFyimJqhKfZd0v1L2dQx3yoHcXbvgrMJpi91sq/ICVRW8+4LVRJ54hyx7dubcBGaRY5N2u++lBmMR6whMmQdG7bydSsDaWTtrZ+2snbWzdtbO2lk7a2ftrJ1BO4LMQfca74NrksnwaPf/xG+EVVghvA65LwAAAABJRU5ErkJggg==',
          createdAt: '2023-12-24T10:26:17.136Z',
          updatedAt: '2023-12-24T10:26:17.136Z',
          __v: 0,
        },
      ],
      groupAdmin: {
        _id: '658452e7a53498d08e928df8',
        name: 'ankit1',
        email: 'ankit1@gmail.com',
        pic: 'http://res.cloudinary.com/dsqteibj6/image/upload/v1703308844/juv9vvaeqog9iwmnjy8n.jpg',
        createdAt: '2023-12-21T14:59:51.740Z',
        updatedAt: '2023-12-21T14:59:51.740Z',
        __v: 0,
      },
      __v: 0,
    },
  ];

  constructor(private chatService: ChatService) {
    this.chatService.getChatsList();
  }

  ngOnInit(): void {
    // this.chatList = this.tempData;

    this.chatService.chatList.subscribe((data: any) => {
      console.log('sidebar Data : ', data);
      this.chatList = data;
    });
  }

  selectUserChat(userChat: any): void {
    this.selectedUserChat = userChat;
  }
}
