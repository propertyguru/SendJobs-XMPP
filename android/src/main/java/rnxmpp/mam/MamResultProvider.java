package rnxmpp.mam;

/**
 *
 * Copyright 2016 Fernando Ramirez
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import org.jivesoftware.smack.SmackException;
import org.jivesoftware.smack.packet.Message;
import org.jivesoftware.smack.provider.ExtensionElementProvider;
import org.jivesoftware.smackx.forward.packet.Forwarded;
import org.jivesoftware.smackx.forward.provider.ForwardedProvider;
import rnxmpp.mam.MamElements.MamResultExtension;
import org.xmlpull.v1.XmlPullParser;
import org.xmlpull.v1.XmlPullParserException;

import java.io.IOException;

/**
 * MAM Result Provider class.
 *
 * @see <a href="http://xmpp.org/extensions/xep-0313.html">XEP-0313: Message
 *      Archive Management</a>
 * @author Fernando Ramirez
 *
 */
public class MamResultProvider extends ExtensionElementProvider<MamResultExtension> {

    @Override
    public MamResultExtension parse(XmlPullParser parser, int initialDepth) throws IOException, XmlPullParserException, SmackException {
        Forwarded forwarded = null;
        Message message = null;
        String queryId = parser.getAttributeValue("", "queryid");
        String id = parser.getAttributeValue("", "id");
        String pinned = null;


        outerloop: while (true) {
            final int eventType = parser.next();
            final String name = parser.getName();
            switch (eventType) {
                case XmlPullParser.START_TAG:
                    switch (name) {
                        case Forwarded.ELEMENT:
                            forwarded = new ForwardedProvider().parse(parser);
                            break;

//                        case Message.BODY:
//                            System.out.println("BODY stuff....");
//                            pinned = parser.getAttributeValue("", "pinned");
//                            if(pinned != null){
//                                System.out.println("pinned attribute" + pinned);
//                            }
//
//                            break;
                    }
                    break;
                case XmlPullParser.END_TAG:
                    if (parser.getDepth() == initialDepth) {
                        break outerloop;
                    }
                    break;
            }
        }

        return new MamResultExtension(queryId, id, forwarded);
    }

}