module Api
  module V1
    class FlowsController < RestAdminController
      def index
        authorize :flow
        @simple_chats = SimpleChat.all
        @outros = Outro.all
        @showcases = Showcase.all
        @navigations = Navigation.all
        render json: @simple_chats + @outros + @showcases + @navigations
      end
    end
  end
end